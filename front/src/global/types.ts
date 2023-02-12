
export interface IPost {
    id: string;
    car_name: string;
    car_model: string;
    car_year: string;
    car_color: string;
    car_price: string;
    car_description: string;
    car_image: string;
    created_at: string;
    updated_at: string;
    reserved_at: Date[];
}

export interface IUser {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    bio: string;
    avatar_url: string;
    cover_url: string;
    posts: IPost[];
  }

  export interface TPost{
    id: string;
    car_name: string;
    car_model: string;
    car_year: string;
    car_color: string;
    car_price: string;
    car_description: string;
    car_image: string[];
    created_at: Date;
    updated_at: Date;
    reserved_at: Date[];
    owner: IUser;
}

export interface TPostMetadata {
    id: string;
    car_name: string;
    car_color: string;
    car_price: string;
    car_description: string;
    car_image: string;
    created_at: Date;
    updated_at: Date;
}

