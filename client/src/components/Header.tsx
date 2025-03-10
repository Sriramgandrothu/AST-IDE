"use client"

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { handleError } from "@/utils/handleError"
import { useLogoutMutation } from "@/redux/slices/api"
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { updateIsOwner } from "@/redux/slices/compilerSlice"
import { GiHamburgerMenu } from "react-icons/gi"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation()
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  const windowWidth = useSelector((state: RootState) => state.appSlice.windowWidth)
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)
  const { currentUser } = useSelector((state: RootState) => state.appSlice)
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout().unwrap()
      dispatch(updateIsLoggedIn(false))
      dispatch(updateCurrentUser({}))
      dispatch(updateIsOwner(false))
      sessionStorage.removeItem("token") // Remove token on logout
      navigate("/")
    } catch (error) {
      handleError(error)
    }
  }

  const handleCloseSheet = () => {
    setSheetOpen(false)
  }

  const handleClick = () => {
    window.open("http://sriramgandrothu.netlify.app/", "_blank")
  }

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none ml-2">AST</h2>
      </Link>
      {windowWidth > 640 ? (
        <ul className="flex gap-2">
          <li>
            <Link to="/">
              <Button variant="link">Home</Button>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={handleClick}>
              <Button variant="link">About</Button>
            </Link>
          </li>
          <li>
            <Link to="/compiler">
              <Button variant="link">Compiler</Button>
            </Link>
          </li>
          {currentUser?.isAdmin && (
            <li>
              <Link to="/all-codes">
                <Button variant="link">All Codes</Button>
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/my-codes">
                  <Button variant="link">My Codes</Button>
                </Link>
              </li>
              <li>
                <Button loading={isLoading} onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </li>
              <li>
                <Avatar>
                  <AvatarImage src={currentUser.picture} />
                  <AvatarFallback className="capitalize">{currentUser.username?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <Button variant="link">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Button variant="link">Signup</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : (
        <div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <ul className="flex gap-2 flex-col py-5">
                <li>
                  <Link to="/">
                    <Button onClick={handleCloseSheet} variant="link">
                      Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleClick}>
                    <Button variant="link">About</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/compiler">
                    <Button onClick={handleCloseSheet} variant="link">
                      Compiler
                    </Button>
                  </Link>
                </li>
                {currentUser?.isAdmin && (
                  <li>
                    <Link to="/all-codes">
                      <Button onClick={handleCloseSheet} variant="link">
                        All Codes
                      </Button>
                    </Link>
                  </li>
                )}
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/my-codes">
                        <Button onClick={handleCloseSheet} variant="link">
                          My Codes
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Button
                        loading={isLoading}
                        onClick={async () => {
                          await handleLogout()
                          handleCloseSheet()
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <Button onClick={handleCloseSheet} variant="link">
                          Login
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <Button onClick={handleCloseSheet} variant="link">
                          Signup
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Team AST</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">Developed by Sriram Gandrothu</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
                  © {new Date().getFullYear()} All Rights Reserved
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </nav>
  )
}

