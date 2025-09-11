import { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils" 
//import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
const KYCProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [idType, setIdType] = useState(""); // BVN, National ID, Driver’s License
  const [idValue, setIdValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Data = {
      name,
      username,
      date,
      gender,
      idType,
      idValue,
      faceVerification: image,
    };
    console.log("KYC Data:", Data);
    navigate("/dashboard");
  };

  return (
      <div className={cn("flex flex-col gap-6")} >
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 max-sm:p-4 flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold "> Setup Your KYC Profile</h1>
              </div>

             {/* Face Verification */}
              <div className="text-center mt-2 flex justify-center sm:col-span-2">
                <div className="relative w-32 h-32 max-sm:w-24 max-sm:h-24 max-md:w-28 max-md:h-28 rounded-full border-2 border-lime-300 flex items-center justify-center overflow-hidden">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-900 cursor-pointer max-sm:text-xs max-md:text-sm"
                  >
                    <PhotoIcon className="mx-auto size-12 max-sm:size-8 max-md:size-10 text-lime-300" />
                    <span className="text-sm text-gray-500 max-sm:text-xs max-md:text-sm">
                      Upload Face ID
                    </span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300"
                />
              </div>

              {/* Username */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300"
                />
              </div>

              {/* Date of Birth */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300"
                />
              </div>

              {/* Gender */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm text-gray-500 focus:ring-2 focus:ring-lime-300"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Means of Identification */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                  Means of Identification
                </label>
                <select
                  value={idType}
                  onChange={(e) => {
                    setIdType(e.target.value);
                    setIdValue("");
                  }}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm text-gray-500 focus:ring-2 focus:ring-lime-300"
                >
                  <option value="">Choose one</option>
                  <option value="BVN">BVN</option>
                  <option value="National ID">National ID</option>
                  <option value="Driver’s License">Driver’s License</option>
                </select>
              </div>

              {/* ID input */}
              {idType && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">
                    {idType} Number
                  </label>
                  <input
                    type="text"
                    value={idValue}
                    onChange={(e) => setIdValue(e.target.value)}
                    required
                    className="mt-2.5 block w-full rounded-md border px-3.5 py-2 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300"
                  />
                </div>
              )}
            </div>


            <div className="mt-5">
              <button
                type="submit"
                className="
                  w-full min-w-[130px] h-10 
                  text-white font-bold 
                  px-2.5 py-1.5 
                  relative inline-block 
                  rounded-md border-none outline-none 
                  cursor-pointer transition-all duration-300 ease-in-out 
                  bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                  hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                  active:shadow-[0_0px_0_#57cc99] active:top-[5px]
                  max-sm:text-sm max-md:h-9
                "
              >
                Next
              </button>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4kyBp73_Rn5vtVsmcXdLZDZpokJtswoSENoRpMhyStMiYQ6gxCwz5Kd9rGkcABu4Ixb4&usqp=CAU"
              alt="Image"
              className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] 
              dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCProfile;
