import { useState } from 'react'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would call your backend API
    console.log("Reset link sent to:", email)
    navigate('/reset-password')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 max-md:p-4 max-sm:p-3">
      <Card className="w-full max-w-md shadow-lg rounded-2xl max-sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center max-sm:text-lg max-md:text-lg">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-sm:space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="max-sm:text-sm max-md:text-base"
            />
            <Button 
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
                max-sm:h-9 max-sm:text-sm max-md:h-9 max-md:text-sm
              "
            >
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
