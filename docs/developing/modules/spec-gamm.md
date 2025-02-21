# GAMM

The ``GAMM`` module (**G**eneralized **A**utomated **M**arket **M**aker) provides the logic to create and interact with liquidity pools on the Osmosis DEX.

</br>
</br>

## Overview

### Network Parameters

Pools have the following parameters:

- SwapFee
- ExitFee
- FutureGovernor
- Weights
- SmoothWeightChangeParams

We will go through these in sequence.

1. **SwapFee** -
    The swap fee is the cut of all swaps that goes to the Liquidity Providers (LPs) for a pool. Suppose a pool has a swap fee `s`. Then if a user wants to swap `T` tokens in the pool, `sT` tokens go to the LP's, and then `(1 - s)T` tokens are swapped according to the AMM swap function.
2. **ExitFee** -
    The exit fee is a fee that is applied to LP's that want to remove their liquidity from the pool. Suppose a pool has an exit fee `e`. If they currently have `S` LP shares, then when they remove their liquidity they get tokens worth `(1 - e)S` shares back. The remaining `eS` shares are then burned, and the tokens corresponding to these shares are kept as liquidity.
3. **FutureGovernor** -
    Osmosis plans to allow every pool to act as a DAO, with its own governance in a future upgrade. To facilitate this transition, we allow pools to specify who the governor should be as a string. There are currently 3 options for the future governor.
    - No one will govern it. This is done by leaving the future governor string as blank.
    - Allow a given address to govern it. This is done by setting the future governor as a bech32 address.
    - Lockups to a token. This is the full DAO scenario. The future governor specifies a token denomination `denom`, and a lockup duration `duration`. This says that "all tokens of denomination `denom` that are locked up for `duration` or longer, have equal say in governance of this pool".
4. **Weights** -
    This defines the weights of the pool - [https://balancer.fi/whitepaper.pdf](https://balancer.fi/whitepaper.pdf)
5. **SmoothWeightChangeParams** -
    This allows pool governance to smoothly change the weights of the assets it holds in the pool. So it can slowly move from a 2:1 ratio, to a 1:1 ratio. Currently, smooth weight changes are implemented as a linear change in weight ratios over a given duration of time. So weights changed from 4:1 to 2:2 over 2 days, then at day 1 of the change, the weights would be 3:1.5, and at day 2 its 2:2, and will remain at these weight ratios.

The GAMM module also has a **PoolCreationFee** parameter, which currently is set to `100000000 uosmo` or `100 OSMO`.

[comment]: <> (TODO Add better description of how the weights affect things)



</br>
</br>

## Transactions


### create-pool
Create a new liquidity pool and provide initial liquidity to it. 

```
osmosisd tx gamm create-pool --pool-file --from --chain-id
```
The JSON `--pool-file` (in this case named `config.json`) must specify the following parameters:

```json
{
	"weights": [list weighted denoms],
	"initial-deposit": [list of denoms with initial deposit amount],
	"swap-fee": [swap fee in percentage],
	"exit-fee": [exit fee in percentage],
	"future_pool_governor": [see options in pool parameters section above]
}
```

#### Example

Create a new AKT-OSMO liquidity pool with a swap and exit fee of 1%.

```sh
osmosisd tx gamm create-pool --pool-file config.json --from WALLET_NAME --chain-id osmosis-1
```

The configuration file contains the following parameters:

```json
{
	"weights": "5ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4,5uosmo",
	"initial-deposit": "499404ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4,500000uosmo",
	"swap-fee": "0.01",
	"exit-fee": "0.01",
	"future_pool_governor": ""
}
```
</br>

::: warning
There is now a 100 OSMO fee for creating pools.
:::


</br>
</br>

### join-pool
Add liquidity to a specified pool to get an **exact** amount of LP shares while specifying a **maximum** number tokens willing to swap to receive said LP shares.

```
osmosisd tx gamm join-pool --pool-id --max-amounts-in --share-amount-out --from --chain-id
```

#### Example

Join `pool 3` with a **maximum** of `.037753 AKT` and the corresponding amount of `OSMO` to get an **exact** share amount of `1.227549469722224220 gamm/pool/3` using `WALLET_NAME` on the osmosis mainnet:

```sh
osmosisd tx gamm join-pool --pool-id 3 --max-amounts-in 37753ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 --share-amount-out 1227549469722224220 --from WALLET_NAME --chain-id osmosis-1
```


</br>
</br>


### exit-pool
Remove liquidity from a specified pool with an **exact** amount of LP shares while specifying the **minimum** number of tokens willing to receive for said LP shares.

```
osmosisd tx gamm exit-pool --pool-id --min-amounts-out --share-amount-in --from --chain-id
```

#### Example

Exit `pool 3` with for **exactly** `1.136326462628731195 gamm/pool/3` in order to receive a **minimum** of `.033358 AKT` and the corresponding amount of `OSMO` using `WALLET_NAME` on the osmosis mainnet:

```sh
osmosisd tx gamm exit-pool --pool-id 3 --min-amounts-out 33358ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 --share-amount-in 1136326462628731195 --from WALLET_NAME --chain-id osmosis-1
```


</br>
</br>



### join-swap-extern-amount-in

Add liquidity to a specified pool with only one of the required assets (i.e. Join pool 1 (50/50 ATOM-OSMO) with just ATOM).

This command essentially swaps an **exact** amount of an asset for the required pairing and then converts the pair to a **minimum** of the requested LP shares in a single step (i.e. combines the `swap-exact-amount-in` and `join-pool` commands)

```
osmosisd tx gamm join-swap-extern-amount-in [token-in] [share-out-min-amount] --from --pool-id --chain-id
```

#### Example

Join `pool 3` with **exactly** `.200000 AKT` (and `0 OSMO`) to get a **minimum** of `3.234812471272883046 gamm/pool/3` using `WALLET_NAME` on the osmosis mainnet:

```sh
osmosisd tx gamm join-swap-extern-amount-in 200000ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 3234812471272883046 --pool-id 3 --from WALLET_NAME --chain-id osmosis-1
```

</br>
</br>



### exit-swap-extern-amount-out

Remove liquidity from a specified pool with a **maximum** amount of LP shares and swap to an **exact** amount of one of the token pairs (i.e. Leave pool 1 (50/50 ATOM-OSMO) and receive 100% ATOM instead of 50% OSMO and 50% ATOM).

This command essentially converts an LP share into the corresponding share of tokens and then swaps to the specified `token-out` in a single step (i.e. combines the `swap-exact-amount-out` and `exit-pool` commands)

```
osmosisd tx gamm exit-swap-extern-amount-out [token-out] [share-in-max-amount] --pool-id --from --chain-id
```

#### Example

Exit `pool 3` by removing a **maximum** of `3.408979387886193586 gamm/pool/3` and swap the `OSMO` portion of the LP share to receive 100% AKT in the **exact** amount of `0.199430 AKT`:

```sh
osmosisd tx gamm exit-swap-extern-amount-out 199430ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 3408979387886193586 --pool-id 3 --from WALLET_NAME --chain-id osmosis-1
```


</br>
</br>



### join-swap-share-amount-out

Swap a **maximum** amount of a specified token for another token, similar to swapping a token on the trade screen GUI (i.e. takes the specified asset and swaps it to the other asset needed to join the specified pool) and then adds an **exact** amount of LP shares to the specified pool.

```
osmosisd tx gamm join-swap-share-amount-out [token-in-denom] [token-in-max-amount] [share-out-amount] --pool-id --from --chain-id
```

#### Example

Swap a **maximum** of `0.312466 OSMO` for the corresponding amount of `AKT`, then join `pool 3` and receive **exactly** `1.4481270389710236872 gamm/pool/3`:

```sh
osmosisd tx gamm join-swap-share-amount-out uosmo 312466 14481270389710236872 --pool-id 3 --from WALLET_NAME --chain-id osmosis-1
```

</br>
</br>



### exit-swap-share-amount-in

Remove an **exact** amount of LP shares from a specified pool, swap the LP shares to one of the token pairs to receive a **minimum** of the specified token amount.

```sh
osmosisd tx gamm exit-swap-share-amount-in [token-out-denom] [share-in-amount] [token-out-min-amount] --pool-id --from --chain-id
```

#### Example

Exit `pool 3` by removing **exactly** `14.563185400026723131 gamm/pool/3` and swap the `AKT` portion of the LP share to receive 100% OSMO in the **minimum** amount of `.298548 OSMO`:

```sh
osmosisd tx gamm exit-swap-share-amount-in uosmo 14563185400026723131 298548 --pool-id 3 --from WALLET_NAME --chain-id osmosis-1
```


</br>
</br>


### swap-exact-amount-in

Swap an **exact** amount of tokens for a **minimum** of another token, similar to swapping a token on the trade screen GUI. 


```
osmosisd tx gamm swap-exact-amount-in [token-in] [token-out-min-amount] --pool-id --from --chain-id
```

#### Example

Swap **exactly** `.407239 AKT` through `pool 3` into a **minimum** of `.140530 OSMO` using `WALLET_NAME` on the osmosis mainnet:

```sh
osmosisd tx gamm swap-exact-amount-in 407239ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 140530 --swap-route-pool-ids 3 --swap-route-denoms uosmo --from WALLET_NAME --chain-id osmosis-1
```

</br>
</br>


### swap-exact-amount-out

Swap a **maximum** amount of tokens out for an **exact** amount of another token, similar to swapping a token on the trade screen GUI.

```
osmosisd tx gamm swap-exact-amount-out [token-out] [token-out-max-amount] --pool-id --from --chain-id
```

#### Example

Swap a **maximum** of `.407239 AKT` through `pool 3` into **exactly** `.140530 OSMO` using `WALLET_NAME` on the osmosis mainnet:

```sh
osmosisd tx gamm swap-exact-amount-out 140530uosmo 407239 --swap-route-pool-ids 3 --swap-route-denoms ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4 --from WALLET_NAME --chain-id osmosis-1
```


[comment]: <> (Other resources Creating a liquidity bootstrapping pool and Creating a pool with a pool file)


</br>
</br>


## Queries

### estimate-swap-exact-amount-in

Query the estimated result of the [swap-exact-amount-in](#swap-exact-amount-in) transaction. 

```
osmosisd query gamm estimate-swap-exact-amount-in [poolID] [sender] [tokenIn] --swap-route-pool-ids --swap-route-denoms
```

#### Example

Query the amount of ATOM (or `ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2`) the `sender` would receive for swapping `1 OSMO` in `pool 1`.

```sh
osmosisd query gamm estimate-swap-exact-amount-in 1 osmo123nfq6m8f88m4g3sky570unsnk4zng4uqv7cm8 1000000uosmo --swap-route-pool-ids 1 --swap-route-denoms ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2 
```

</br>
</br>


### estimate-swap-exact-amount-out

Query the estimated result of the [swap-exact-amount-out](#swap-exact-amount-out) transaction. 

```
osmosisd query gamm estimate-swap-exact-amount-out [poolID] [sender] [tokenOut] --swap-route-pool-ids --swap-route-denoms
```

#### Example

Query the amount of `OSMO` the `sender` would require to swap 1 ATOM (or `1000000ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2`) our of `pool 1`:

```sh
osmosisd query gamm estimate-swap-exact-amount-out 1 osmo123nfq6m8f88m4g3sky570unsnk4zng4uqv7cm8 1000000ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2 --swap-route-pool-ids 1 --swap-route-denoms uosmo
```

</br>
</br>


### num-pools

Query the number of active pools.

#### Example

```sh
osmosisd query gamm num-pools
```

</br>
</br>


### pool

Query the parameter and assets of a specific pool.

```
osmosisd query gamm pool [poolID] [flags]
```

#### Example

Query parameters and assets from `pool 1`.

```sh
osmosisd query gamm pool 1
```

Which outputs:

```sh
  address: osmo1mw0ac6rwlp5r8wapwk3zs6g29h8fcscxqakdzw9emkne6c8wjp9q0t3v8t
  id: 1
  pool_params:
    swap_fee: "0.003000000000000000"
    exit_fee: "0.000000000000000000"
    smooth_weight_change_params: null
  future_pool_governor: 24h
  total_weight: "1000000.000000000000000000"
  total_shares:
    denom: gamm/pool/1
    amount: "252329392916236134754561337"
  pool_assets:
  - |
    token:
      denom: ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2
      amount: "4024633105693"
    weight: "500000.000000000000000000"
  - |
    token:
      denom: uosmo
      amount: "21388879300450"
    weight: "500000.000000000000000000"
```

</br>
</br>

### pool-assets

Query the assets of a specific pool. This query is a reduced form of the [pool](#pool) query.

```
osmosisd query gamm pool-assets [poolID] [flags]
```

#### Example

Query the assets from `pool 1`.

```sh
osmosisd query gamm pool-assets 1
```

Which outputs:

```sh
poolAssets:
- token:
    amount: "4024839695885"
    denom: ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2
  weight: "536870912000000"
- token:
    amount: "21387918414792"
    denom: uosmo
  weight: "536870912000000"
```


</br>
</br>

### Pool Params

Query the parameters of a specific pool. This query is a reduced form of the [pool](#pool) query.

```
osmosisd query gamm pool-params [poolID] [flags]
```

#### Example

Query the parameters from pool 1.

```sh
osmosisd query gamm pool-params 1
```

Which outputs:

```sh
swap_fee: "0.003000000000000000"
exit_fee: "0.000000000000000000"
smooth_weight_change_params: null
```

</br>
</br>


### pools

Query parameters and assets of all active pools.

#### Usage

```sh
osmosisd query gamm pools
```

</br>
</br>



### spot-price

Query the spot price of a pool asset based on a specific pool it is in.

```
osmosisd query gamm spot-price [poolID] [tokenInDenom] [tokenOutDenom] [flags]
```

#### Example

Query the price of OSMO based on the price of ATOM in pool 1:

```sh
osmosisd query gamm spot-price 1 uosmo ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2
```

Which outputs:

```sh
spotPrice: "5.314387014412388547"
```

In other words, at the time of this writing, ~5.314 OSMO is equivalent to 1 ATOM.



</br>
</br>


### total-liquidity

Query the total liquidity of all active pools.

#### Usage

```sh
osmosisd query gamm total-liquidity
```

</br>
</br>



### total-share

Query the total amount of GAMM shares of a specific pool.

```
osmosisd query gamm total-share [poolID] [flags]
```

#### Example

Query the total amount of GAMM shares of pool 1.

```sh
osmosisd query gamm total-share 1
```

Which outputs:

```sh
totalShares:
  amount: "252328895834096787303097071"
  denom: gamm/pool/1
```

Indicating there are a total of `252328895.834096787303097071 gamm/pool/1` at the time of this writing