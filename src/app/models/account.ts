export class Account {
    user_id: number
    email: string
    password: string
    create_at: Date
    deleted: boolean

    constructor(obj?: any) {
        if (obj) {
            try {
                this.user_id = obj.user_id
                this.email = obj.email
                this.password = obj.password
                this.create_at = obj.create_at
                this.deleted = obj.deleted
            } catch (e) {
                console.log(e)
            }
        }
    }
}
