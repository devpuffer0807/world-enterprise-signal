# World Enterprise Event Reader

This is an event listener to get all transactions event of world enterprise smart contract transactions.
All transactions are saved in AWS `DynamoDB` with AWS `Lambada`

## World Enterprise Event List

### WorldEnterpriseFactory Smart Contract Event

`CreateWorldEnterprise`

- Params

| name       | type      | description                |
| :--------- | :-------- | :------------------------- |
| users      | address[] | Users list                 |
| shares     | uint256[] | Token shares amount list   |
| name       | string    | Token name                 |
| name       | string    | Token name                 |
| symbol     | string    | Token symbol               |
| enterprise | address   | Created enterprise address |

### WorldEnterprise Smart Contract Event

`JoinWorldEnterprise`

- Params

| name          | type    | description         |
| :------------ | :------ | :------------------ |
| proposalIndex | uint256 | Proposal index      |
| proposer      | address | Address of proposer |
| amount        | uint256 | Proposal amount     |
| startTime     | uint256 | State timestamp     |
| endTime       | uint256 | End timestamp       |

`VoteYes`

- Params

| name          | type    | description                  |
| :------------ | :------ | :--------------------------- |
| account       | address | Client address to vote `yes` |
| proposalIndex | uint256 | Proposal index               |

`VoteNo`

- Params

| name          | type    | description                 |
| :------------ | :------ | :-------------------------- |
| account       | address | Client address to vote `no` |
| proposalIndex | uint256 | Proposal index              |

`ExecutePassed`

- Params

| name          | type    | description      |
| :------------ | :------ | :--------------- |
| proposalIndex | uint256 | Proposal index   |
| proposer      | address | Proposer address |
| amount        | uint256 | Proposal amount  |

`ExecuteFailed`

- Params

| name          | type    | description    |
| :------------ | :------ | :------------- |
| proposalIndex | uint256 | Proposal index |

`CreateBuyOrder`

- Params

| name       | type    | description   |
| :--------- | :------ | :------------ |
| orderIndex | uint256 | Order index   |
| owner      | address | Owner address |
| amount     | uint256 | Token amount  |
| price      | uint256 | Price         |

`CreateSellOrder`

- Params

| name       | type    | description   |
| :--------- | :------ | :------------ |
| orderIndex | uint256 | Order index   |
| owner      | address | Owner address |
| amount     | uint256 | Token amount  |
| price      | uint256 | Price         |

`CloseOrder`

- Params

| name    | type    | description |
| :------ | :------ | :---------- |
| orderId | uint256 | Order id    |

`CancelOrder`

- Params

| name    | type    | description |
| :------ | :------ | :---------- |
| orderId | uint256 | Order id    |

## Environment

- Node version (^ 16.0.0)
- Yarn version (^ 1.22.0)

## Running Project

### Install dependency

`yarn install`

### Run

`yarn start`
