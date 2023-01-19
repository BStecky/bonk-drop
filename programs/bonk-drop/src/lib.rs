use std::char::MAX;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::pubkey;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Burn, Mint, SetAuthority, Token, TokenAccount, Transfer};

declare_id!("3BM5STVPUNwaJzsA7MoCU3ASNuj51tvad5ZycGbx3LNv");

#[program]
pub mod bonk_drop {
    use super::*;

    pub fn init_treasury(ctx: Context<InitTreasury>) -> Result<()> {
        let treasury = &mut ctx.accounts.treasury;
        treasury.authority = ctx.accounts.authority.key();
        treasury.treasury_address = ctx.accounts.treasury_address.key();
        treasury.bump = *ctx.bumps.get("treasury").unwrap();
        Ok(())
    }

    pub fn create_account(ctx: Context<CreateDropAccount>) -> Result<()> {
        let drop_account = &mut ctx.accounts.drop_account;
        drop_account.total_dropped = 0;
        drop_account.authority = ctx.accounts.authority.key();
        drop_account.bump = *ctx.bumps.get("drop_account").unwrap();
        Ok(())
    }

    pub fn drop_bonk(ctx: Context<DropBonk>, amount: u64) -> Result<()> {
        let amount_parsed = ((amount as f64) * 1e5) as f64; //Bonk is a 5 decimal token
        let burn_amount = amount_parsed / 2 as f64; // 50% burned
        let donate_amount = amount_parsed / 2 as f64; //50% to treasury wallet to be donated
        let user_bonk_account = &mut ctx.accounts.drop_account;
        user_bonk_account.total_dropped += amount;
        token::transfer(ctx.accounts.transfer_ctx(), donate_amount as u64)?;
        token::burn(ctx.accounts.burn_token_ctx(), burn_amount as u64)?;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitTreasury<'info> {
    #[account(init, seeds = [b"treasury_config".as_ref()], bump, payer = authority, space = Treasury::LEN)]
    pub treasury: Account<'info, Treasury>,
    #[account(mut, address = pubkey!("DogVHWGqvM1n6VKBjG5wAHbiGDXmG734o53eFmi9bZVF"))]
    pub authority: Signer<'info>,
    /// CHECK: Pass in the wallet address for the treasury, only happens once so its fine.
    pub treasury_address: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct CreateDropAccount<'info> {
    #[account (seeds = [b"treasury_config".as_ref()], bump = treasury.bump)]
    pub treasury: Account<'info, Treasury>,
    #[account(init, seeds = [authority.key().as_ref(), b"user".as_ref()], bump, payer = authority, space = DropAccount::LEN)]
    pub drop_account: Account<'info, DropAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DropBonk<'info> {
    #[account (seeds = [b"treasury_config".as_ref()], bump = treasury.bump)]
    pub treasury: Account<'info, Treasury>,
    /// CHECK: Address is checked with the initialized address on Treasury account.
    #[account(mut, address = treasury.treasury_address)]
    pub treasury_address: UncheckedAccount<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut, seeds = [authority.key().as_ref(), b"user".as_ref()], bump = drop_account.bump)]
    pub drop_account: Account<'info, DropAccount>,
    #[account(mut)]
    pub token_mint: Account<'info, Mint>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}
impl<'info> DropBonk<'info> {
    pub fn burn_token_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Burn<'info>> {
        CpiContext::new(
            self.token_program.to_account_info(),
            Burn {
                mint: self.token_mint.to_account_info(),
                from: self.user_token_account.to_account_info(),
                authority: self.authority.to_account_info(),
            },
        )
    }
    pub fn transfer_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        CpiContext::new(
            self.token_program.to_account_info(),
            Transfer {
                from: self.user_token_account.to_account_info(),
                to: self.treasury_address.to_account_info(),
                authority: self.authority.to_account_info(),
            },
        )
    }
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBKEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4; 
const MAX_STRING_LENGTH: usize = 50 * 4; // 50 characters long (max 4 bytes each)
const UNSIGNED64_LENGTH: usize = 8;
const UNSIGNED32_LENGTH: usize = 4;
const UNSIGNED16_LENGTH: usize = 2;
const BUMP_LENGTH: usize = 1;

#[account]
pub struct Treasury {
    pub authority: Pubkey,
    pub treasury_address: Pubkey,
    pub bump: u8,
}

impl Treasury {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBKEY_LENGTH
        + PUBKEY_LENGTH
        + BUMP_LENGTH;
}

#[account]
pub struct DropAccount {
    pub authority: Pubkey,
    pub bump: u8,
    pub twitter: String,
    pub discord: String,
    pub total_dropped: u64,
}

impl DropAccount {
    const LEN: usize = DISCRIMINATOR_LENGTH
    + PUBKEY_LENGTH
    + BUMP_LENGTH
    + STRING_LENGTH_PREFIX + MAX_STRING_LENGTH
    + STRING_LENGTH_PREFIX + MAX_STRING_LENGTH
    + UNSIGNED64_LENGTH;
}

#[error_code]
pub enum ErrorCode {
    #[msg("You fool, only Dog can do this...")]
    OnlyDogCanDoThis,
}