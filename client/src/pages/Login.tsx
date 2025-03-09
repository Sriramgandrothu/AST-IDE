"use client"

import "./pageStyles/grid.css"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "@/redux/slices/api"
import { handleError } from "@/utils/handleError"
import { useDispatch } from "react-redux"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
})

export default function Login() {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap()
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
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container h-full sm:h-fit bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-full sm:w-[300px]">
        <div className="">
          <h1 className="font-mono text-4xl font-bold text-left">Login</h1>
          <p className="font-mono text-xs mt-2">Welcome back fellow coder 😁</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required disabled={isLoading} placeholder="Username or Email" {...field} />
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
                        required
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
              Login
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono">
          Don't have an account?{" "}
          <Link className=" text-blue-500" to="/signup">
            Signup
          </Link>
          .
        </small>
      </div>
      <p className="font-mono text-xs text-blue-500">Team AST</p>
    </div>
  )
}

