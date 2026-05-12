import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Card, CardContent } from "../components/ui/card";

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto size-12 text-lime-300 max-sm:size-8 max-md:size-10" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <circle cx="12" cy="13" r="3" />
      <path d="M8 7l1.5-2h5L16 7" />
    </svg>
  )
}

const KYCProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [idType, setIdType] = useState("");
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
    navigate("/dashboard");
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="flex flex-col justify-center p-6 max-sm:p-4 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Setup Your KYC Profile</h1>
              </div>

              <div className="mt-2 flex justify-center text-center sm:col-span-2">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-lime-300 max-sm:h-24 max-sm:w-24 max-md:h-28 max-md:w-28">
                  <label htmlFor="photo" className="block cursor-pointer text-sm font-medium text-gray-900 max-sm:text-xs max-md:text-sm">
                    <PhotoIcon />
                    <span className="text-sm text-gray-500 max-sm:text-xs max-md:text-sm">Upload Face ID</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Preview"
                      className="absolute inset-0 h-full w-full rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">Date of Birth</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2.5 block w-full rounded-md border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 max-sm:text-xs max-md:text-sm">Means of Identification</label>
                <select
                  value={idType}
                  onChange={(e) => {
                    setIdType(e.target.value);
                    setIdValue("");
                  }}
                  required
                  className="mt-2.5 w-full rounded-md border px-3.5 py-2 text-sm text-gray-500 focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                >
                  <option value="">Choose one</option>
                  <option value="BVN">BVN</option>
                  <option value="National ID">National ID</option>
                  <option value="Driver License">Driver License</option>
                </select>
              </div>

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
                    className="mt-2.5 block w-full rounded-md border px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-300 max-sm:px-2.5 max-sm:py-1.5 max-md:px-3 max-md:py-2"
                  />
                </div>
              )}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="relative inline-block h-10 w-full min-w-[130px] cursor-pointer rounded-md border-none bg-[#80ed99] px-2.5 py-1.5 font-bold text-white outline-none transition-all duration-300 ease-in-out shadow-[0_5px_0_#57cc99] hover:top-[1px] hover:shadow-[0_3px_0_#57cc99] active:top-[5px] active:shadow-[0_0px_0_#57cc99] max-sm:text-sm max-md:h-9"
              >
                Next
              </button>
            </div>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4kyBp73_Rn5vtVsmcXdLZDZpokJtswoSENoRpMhyStMiYQ6gxCwz5Kd9rGkcABu4Ixb4&usqp=CAU"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCProfile;
