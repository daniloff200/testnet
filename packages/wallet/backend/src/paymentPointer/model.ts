import { Model } from 'objection'
import { BaseModel } from '@/shared/model'
import { Account } from '@/account/model'
import { Transaction } from '@/transaction/model'

interface PaymentPointerKey {
  id: string
  rafikiId: string
  publicKey: string
  createdOn: Date
}

export class PaymentPointer extends BaseModel {
  static tableName = 'paymentPointers'

  publicName!: string
  readonly id!: string
  readonly url!: string
  readonly accountId!: string
  active!: boolean
  account!: Account
  transacions!: Array<Transaction>
  keyIds!: PaymentPointerKey | null

  static relationMappings = () => ({
    account: {
      relation: Model.BelongsToOneRelation,
      modelClass: Account,
      join: {
        from: 'paymentPointers.accountId',
        to: 'accounts.id'
      }
    },

    transactions: {
      relation: Model.HasManyRelation,
      modelClass: Transaction,
      join: {
        from: 'paymentPointers.id',
        to: 'transactions.paymentPointerId'
      }
    }
  })
}
