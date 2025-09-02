import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import React from "react"
import '../index.css'

//interface LoginFormProps extends React.ComponentProps<"div"> {}
type LoginFormProps = React.ComponentProps<"div">

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    navigate("/dashboard")
  }

  return (
    <div className={cn("flex flex-col gap-6 max-sm:px-4", className)} {...props}>
      <Card className="overflow-hidden p-0 w-full max-w-3xl mx-auto">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 max-sm:p-4 flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold max-sm:text-xl">Welcome back</h1>
                <p className="text-muted-foreground text-balance max-sm:text-sm">
                  Login to your SafePocket Inc account
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="max-sm:h-10"
                />
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline max-sm:text-xs"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required className="max-sm:h-10" />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="
                  w-full min-w-[120px] h-10 
                  text-white font-bold 
                  px-2.5 py-1.5 
                  relative inline-block 
                  rounded-md border-none outline-none 
                  cursor-pointer transition-all duration-300 ease-in-out 
                  bg-[#80ed99] shadow-[0_5px_0_#57cc99]
                  hover:shadow-[0_3px_0_#57cc99] hover:top-[1px]
                  active:shadow-[0_0px_0_#57cc99] active:top-[5px]
                  max-sm:text-sm
                "
              >
                Login
              </Button>

              {/* Divider */}
              <div className="after:border-border relative text-center text-sm max-sm:text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Google Button */}
              <div>
                <Button variant="outline" type="button" className="w-full max-sm:text-xs">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
                      1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
                      3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 
                      1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                      20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                      8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 
                      2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 
                      7.07l3.66 2.84c.87-2.6 3.3-4.53 
                      6.16-4.53z"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>

              {/* Signup Link */}
              <div className="text-center text-sm max-sm:text-xs">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 cursor-pointer"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          {/* Right Side Image (hidden on small) */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4kyBp73_Rn5vtVsmcXdLZDZpokJtswoSENoRpMhyStMiYQ6gxCwz5Kd9rGkcABu4Ixb4&usqp=CAU"
              alt="Image"
              className="absolute inset-0 w-90 h-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 max-sm:text-[10px] px-2">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
