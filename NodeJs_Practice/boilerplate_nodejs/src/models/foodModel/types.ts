
export interface foodModelType {
  id?: number;
  uuid?: string;
  created_at?: string;
  updated_at?: string;
  archived?: string;
  name?: string;
  type?: string;
  thumbnail?: string;
  price?: number;
}

export interface foodCreateType {
  name: string;
  type: string;
  thumbnail: string;
  price: number;
}

export interface foodUpdateType {
  name: string;
  type: string;
  thumbnail: string;
  price: number;
}


