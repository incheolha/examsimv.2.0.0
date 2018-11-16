
export class User {
  constructor( public email: string,
               public password: string,
               public name?: string,
               public permissionTag?: string,
               public created_at?: Date,
               public update_at?: Date,
               public provider?: string,
               public authToken?: string,
               public facebook?: string,
               public google?: string ) {}
}
