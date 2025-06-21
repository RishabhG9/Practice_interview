
export interface usersModelType {
  id?: number;
  uuid?: string;
  created_at?: string;
  updated_at?: string;
  archived?: string;
  name?: string;
  email_id?: string;
}

export interface usersCreateType{
  name: string;
  email_id: string;
}

export interface usersUpdateType{
  name: string;
  email_id: string;
}
