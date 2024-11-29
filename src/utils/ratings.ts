import { supabase } from '../../supabase';
import { UserRating } from '../types';

export const fetchRatings = async (): Promise<UserRating[]> => {
  try {
    const { data, error } = await supabase
      .from('ratings')
      .select('beer_id, taste, feel, user_name');

    if (error) {
      throw new Error(error.message);
    }

    return data as UserRating[];
  } catch (e) {
    console.error('Error fetching ratings:', e);
    return [];
  }
};
