import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type NewTrip = Database["public"]["Tables"]["trips"]["Insert"];

export const createTrip = async (trip: NewTrip) => {
  const { data, error } = await supabase
    .from("trips")
    .insert(trip)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getTrips = async () => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const updateTrip = async (id: string, trip: Partial<NewTrip>) => {
  const { data, error } = await supabase
    .from("trips")
    .update(trip)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteTrip = async (id: string) => {
  const { error } = await supabase.from("trips").delete().eq("id", id);
  if (error) throw error;
};
