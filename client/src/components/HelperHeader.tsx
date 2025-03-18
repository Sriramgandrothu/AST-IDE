"use client"

import { Code, Copy, Download, PencilLine, Save, Share2 } from "lucide-react"
import { Button } from "./ui/button"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { type CompilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice"
import type { RootState } from "@/redux/store"
import { handleError } from "@/utils/handleError"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useEditCodeMutation, useSaveCodeMutation, useGetUserDetailsQuery } from "@/redux/slices/api"
import { Input } from "./ui/input"

interface HelperHeaderProps {
  onSaveCheck?: () => boolean
}

export default function HelperHeader({ onSaveCheck }: HelperHeaderProps) {
  const isOwner = useSelector((state: RootState) => state.compilerSlice.isOwner)
  const [shareBtn, setShareBtn] = useState<boolean>(false)
  const [postTitle, setPostTitle] = useState<string>("")
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const navigate = useNavigate()
  const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode)
  const [saveCode, { isLoading }] = useSaveCodeMutation()
  const [editCode, { isLoading: codeEditLoading }] = useEditCodeMutation()

  const { data: user } = useGetUserDetailsQuery()
  const username = user?.username || "Guest"

  useEffect(() => {
    setPostTitle(`${username}'s `)
  }, [username])

  const handleDownloadCode = () => {
    if (fullCode.html === "" && fullCode.css === "" && fullCode.javascript === "") {
      toast("Error: Code is Empty")
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" })
      const cssCode = new Blob([fullCode.css], { type: "text/css" })
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      })

      const htmlLink = document.createElement("a")
      const cssLink = document.createElement("a")
      const javascriptLink = document.createElement("a")

      htmlLink.href = URL.createObjectURL(htmlCode)
      htmlLink.download = "index.html"
      document.body.appendChild(htmlLink)

      cssLink.href = URL.createObjectURL(cssCode)
      cssLink.download = "style.css"
      document.body.appendChild(cssLink)

      javascriptLink.href = URL.createObjectURL(javascriptCode)
      javascriptLink.download = "script.js"
      document.body.appendChild(javascriptLink)

      if (fullCode.html !== "") {
        htmlLink.click()
      }
      if (fullCode.css !== "") {
        cssLink.click()
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click()
      }

      document.body.removeChild(htmlLink)
      document.body.removeChild(cssLink)
      document.body.removeChild(javascriptLink)

      toast("Code Downloaded Successfully!")
    }
  }

  const { urlId } = useParams()
  useEffect(() => {
    if (urlId) {
      setShareBtn(true)
    } else {
      setShareBtn(false)
    }
  }, [urlId])

  const handleSaveClick = () => {
    // Check if user is logged in before opening save dialog
    if (onSaveCheck && !onSaveCheck()) {
      return // Stop the save process if not logged in
    }
    setSaveDialogOpen(true)
  }

  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle }
    try {
      const response = await saveCode(body).unwrap()
      navigate(`/compiler/${response.url}`, { replace: true })
      setSaveDialogOpen(false)
    } catch (error) {
      handleError(error)
    }
  }

  const handleEditCode = async () => {
    try {
      if (urlId) {
        await editCode({ fullCode, id: urlId }).unwrap()
        toast("Code Updated Successully!")
      }
    } catch (error) {
      handleError(error)
    }
  }

  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button variant="success" size="icon" loading={isLoading} onClick={handleSaveClick}>
          <Save size={16} />
        </Button>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 justify-center items-center">
                <Code />
                Save your Code!
              </DialogTitle>
              <div className="__url flex justify-center items-center gap-1">
                <Input
                  className="bg-slate-700 focus-visible:ring-0"
                  placeholder="Type your Post title"
                  value={postTitle}
                  onChange={(e) => {
                    const value = e.target.value
                    const prefix = `${username}'s `
                    if (!value.startsWith(prefix)) {
                      const remainingText = value.replace(prefix.slice(0, value.length), "")
                      setPostTitle(`${prefix}${remainingText}`)
                    } else {
                      setPostTitle(value)
                    }
                  }}
                />
                <Button variant="success" className="h-full" onClick={handleSaveCode}>
                  Save
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button onClick={handleDownloadCode} size="icon" variant="blue">
          <Download size={16} />
        </Button>

        {shareBtn && (
          <>
            {isOwner && (
              <Button loading={codeEditLoading} onClick={handleEditCode} variant="blue">
                <PencilLine size={16} />
                Edit
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary">
                  <Share2 size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 justify-center items-center">
                    <Code />
                    Share your Code!
                  </DialogTitle>
                  <div className="__url flex justify-center items-center gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      className="h-full"
                      onClick={() => {
                        window.navigator.clipboard.writeText(window.location.href)
                        toast("URL Copied to your clipboard!")
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-center text-slate-400 text-xs">Share this URL with your friends to collaborate.</p>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-1">
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) => dispatch(updateCurrentLanguage(value as CompilerSliceStateType["currentLanguage"]))}
        >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

