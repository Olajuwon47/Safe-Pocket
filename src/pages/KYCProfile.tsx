// src/pages/KYCProfile.tsx
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

export default function KYCProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    contact: "",
    bvn: "",
    nationalId: "",
    driversLicense: "",
    facePhoto: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("KYC Submitted:", formData);
    alert("KYC info submitted successfully ✅");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          KYC Profile Verification
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              name="contact"
              type="text"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+234 801 234 5678"
              required
            />
          </div>

          {/* BVN */}
          <div>
            <Label htmlFor="bvn">BVN</Label>
            <Input
              id="bvn"
              name="bvn"
              type="text"
              value={formData.bvn}
              onChange={handleChange}
              placeholder="Enter your BVN"
              required
            />
          </div>

          {/* National ID */}
          <div>
            <Label htmlFor="nationalId">National ID</Label>
            <Input
              id="nationalId"
              name="nationalId"
              type="text"
              value={formData.nationalId}
              onChange={handleChange}
              placeholder="Enter National ID Number"
              required
            />
          </div>

          {/* Driver’s License */}
          <div>
            <Label htmlFor="driversLicense">Driver’s License</Label>
            <Input
              id="driversLicense"
              name="driversLicense"
              type="text"
              value={formData.driversLicense}
              onChange={handleChange}
              placeholder="Enter Driver’s License Number"
            />
          </div>

          {/* Face Verification */}
          <div>
            <Label htmlFor="facePhoto">Upload Face Photo</Label>
            <Input
              id="facePhoto"
              name="facePhoto"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Submit KYC
          </Button>
        </form>
      </div>
    </div>
  );
}
