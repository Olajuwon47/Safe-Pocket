import { useState } from "react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useNavigate } from "react-router-dom"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      console.log("Password reset successfully:", password)
      navigate("/login")
    } else {
      alert("Passwords do not match!")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 max-sm:p-2 md:p-6">
      <Card className="w-full max-w-md md:max-w-lg shadow-lg rounded-2xl max-sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl max-sm:text-lg text-center">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-sm:space-y-3 md:space-y-5">
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="max-sm:text-sm md:text-base"
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="max-sm:text-sm md:text-base"
            />
            <Button
              type="submit"
              className="w-full min-w-[130px] h-10 
                text-white font-bold 
                px-2.5 py-1.5 
                relative inline-block 
                rounded-md border-none outline-none 
                cursor-pointer transition-all duration-300 ease-in-out 
                bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                active:shadow-[0_0px_0_#57cc99] active:top-[5px]
                max-sm:text-sm md:text-base"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
