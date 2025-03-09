"use client"

import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import Loader from "@/components/Loader/Loader"
import RenderCode from "@/components/RenderCode"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useLoadCodeMutation } from "@/redux/slices/api"
import { updateFullCode, updateIsOwner } from "@/redux/slices/compilerSlice"
import type { RootState } from "@/redux/store"
import { handleError } from "@/utils/handleError"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function Compiler() {
  const { urlId } = useParams()
  const windowWidth = useSelector((state: RootState) => state.appSlice.windowWidth)
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId }).unwrap()
        dispatch(updateFullCode(response.fullCode))
        dispatch(updateIsOwner(response.isOwner))
      }
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    if (urlId) {
      loadCode()
    }
  }, [urlId])

  // Function to check if user is logged in before saving
  const handleSaveCheck = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return false
    }
    return true
  }

  const handleLoginRedirect = () => {
    setShowLoginDialog(false)
    // Store current path to redirect back after login
    localStorage.setItem("redirectAfterLogin", location.pathname)
    navigate("/login")
  }

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
        <Loader />
      </div>
    )
  return (
    <>
      <ResizablePanelGroup
        direction={windowWidth > 640 ? "horizontal" : "vertical"}
        className="w-full !h-[calc(100vh-60px)]"
      >
        <ResizablePanel defaultSize={50} className="!h-[calc(100vh-60px)]">
          <HelperHeader onSaveCheck={handleSaveCheck} />
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
          <RenderCode />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>To save your code, you must be logged in.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleLoginRedirect}>Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

