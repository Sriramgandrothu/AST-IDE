"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { handleError } from "@/utils/handleError"
import { useSignupMutation } from "@/redux/slices/api"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((value) => /^[A-Z]/.test(value), "Password must start with a capital letter")
    .refine((value) => /\d/.test(value), "Password must contain at least one number")
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), "Password must contain at least one special character"),
})

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signup, { isLoading }] = useSignupMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap()
      dispatch(updateCurrentUser(response))
      dispatch(updateIsLoggedIn(true))

      // Check if there's a redirect path stored
      const redirectPath = localStorage.getItem("redirectAfterLogin")
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin")
        navigate(redirectPath)
      } else {
        navigate("/")
      }
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container h-full sm:h-fit bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-full sm:w-[300px]">
        <div className="">
          <h1 className="font-mono text-4xl font-bold text-left">Signup</h1>
          <p className=" font-mono text-xs mt-2">Join the community of expert frontend developers🧑‍💻.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">Toggle password visibility</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} className="w-full" type="submit">
              Signup
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono">
          Already have an account?{" "}
          <Link className=" text-blue-500" to="/login">
            Login
          </Link>
          .
        </small>
      </div>
      <p className="font-mono text-xs text-blue-500">Team AST</p>
    </div>
  )
}

