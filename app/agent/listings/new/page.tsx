"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function NewListingPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [counties, setCounties] = useState<any[]>([]);
  const [constituencies, setConstituencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category_id: "",
      county_id: "",
      constituency_id: "",
      price: "",
      price_frequency: "monthly",
      size_sqm: "",
      number_of_rooms: "",
      contact_name: "",
      contact_phone: "",
      contact_email: "",
    },
  });

  const selectedCounty = watch("county_id");

  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase.from("categories").select("id, name");
      const { data: cts } = await supabase.from("counties").select("id, name");
      setCategories(cat || []);
      setCounties(cts || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCounty) return;
    const fetchConstituencies = async () => {
      const { data } = await supabase
        .from("constituencies")
        .select("id, name")
        .eq("county_id", selectedCounty);
      setConstituencies(data || []);
    };
    fetchConstituencies();
  }, [selectedCounty]);

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      // Replace with authenticated user's ID (e.g. from useUser)
      const user_id = (await supabase.auth.getUser()).data.user?.id;
      if (!user_id) {
        toast({
          title: "Authentication required",
          description: "Please log in to add a new listing.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("listings").insert([
        {
          user_id,
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id,
          county_id: formData.county_id,
          constituency_id: formData.constituency_id || null,
          price: formData.price,
          price_frequency: formData.price_frequency,
          size_sqm: formData.size_sqm,
          number_of_rooms: formData.number_of_rooms,
          contact_name: formData.contact_name,
          contact_phone: formData.contact_phone,
          contact_email: formData.contact_email,
          status: "active",
          verification_status: "pending",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Listing added successfully 🎉",
        description: "Your property has been submitted for review.",
      });
      router.push("/listings");
    } catch (err: any) {
      toast({
        title: "Error adding listing",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add New Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input {...register("title", { required: true })} placeholder="e.g. Modern Office in Westlands" />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea {...register("description")} rows={4} placeholder="Enter detailed description..." />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select onValueChange={(v) => setValue("category_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>County</Label>
                <Select onValueChange={(v) => setValue("county_id", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Constituency</Label>
                <Select onValueChange={(v) => setValue("constituency_id", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {constituencies.map((ct) => (
                      <SelectItem key={ct.id} value={ct.id}>
                        {ct.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price and Frequency */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Price (KES)</Label>
                <Input type="number" {...register("price", { required: true })} placeholder="e.g. 45000" />
              </div>
              <div>
                <Label>Frequency</Label>
                <Select onValueChange={(v) => setValue("price_frequency", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Size (sqm)</Label>
                <Input type="number" {...register("size_sqm")} placeholder="e.g. 150" />
              </div>
            </div>

            {/* Rooms */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Number of Rooms</Label>
                <Input type="number" {...register("number_of_rooms")} placeholder="e.g. 4" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Contact Name</Label>
                <Input {...register("contact_name")} placeholder="e.g. John Mwangi" />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input {...register("contact_phone")} placeholder="+2547..." />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input type="email" {...register("contact_email")} placeholder="you@example.com" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? "Saving..." : "Save Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
