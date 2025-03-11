"use client"
import { motion } from "framer-motion"
import { Code2, Terminal, Share2, Copy, ArrowUpRightFromSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TechStackScroll from "@/components/tech-stack-scroll"
import CodeAnimation from "@/components/code-animation"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100dvh-60px)] bg-gradient-to-br from-gray-900 to-gray-950 text-white flex justify-center items-center flex-col gap-6 px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <CodeAnimation />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 max-w-4xl w-full flex flex-col items-center"
      >
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="mb-2">
          <Code2 size={48} className="text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
        >
          AST's Web Compiler
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gray-400 text-center p-3 text-lg max-w-2xl"
        >
          Compile HTML, CSS, JavaScript code on the go and share it with your friends
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mt-6"
        >
          <Link to="/compiler">
            <Button size="lg" className="gap-2">
              <Terminal size={18} />
              Start Coding
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 size={18} />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 mb-2 justify-center items-center">
                  Share Some Links
                  <ArrowUpRightFromSquare size={18} />
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
                <div className="__url flex justify-center items-center gap-1">
                  <input
                    type="text"
                    disabled
                    className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                    value="http://sriramgandrothu.netlify.app"
                  />
                  <Button
                    variant="outline"
                    className="h-full"
                    onClick={() => {
                      navigator.clipboard.writeText("http://sriramgandrothu.netlify.app")
                      toast("URL Copied to your clipboard!")
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                <div className="__url flex justify-center items-center gap-1">
                  <input
                    type="text"
                    disabled
                    className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none"
                    value="https://ast-admin.in"
                  />
                  <Button
                    variant="outline"
                    className="h-full"
                    onClick={() => {
                      navigator.clipboard.writeText("https://ast-admin.in")
                      toast("URL Copied to your clipboard!")
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                </div>
                {/* Social sharing section */}
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Share via:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        const text = encodeURIComponent(
                          "Checkout the amazing web compiler\nMade with Love\nHappy Coding\nhttps://ast-ide.vercel.app/",
                        )
                        window.open(`https://wa.me/?text=${text}`, "_blank")
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Zm0 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                      </svg>
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        const text = encodeURIComponent("Checkout the amazing web compiler\nMade with Love")
                        const url = encodeURIComponent("https://ast-ide.vercel.app/")
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
                          "_blank",
                        )
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        const text = encodeURIComponent("Checkout the amazing web compiler\nMade with Love")
                        const url = encodeURIComponent("https://ast-ide.vercel.app/")
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank")
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        // Instagram doesn't have a direct web sharing API, so we'll open Instagram app/website
                        toast("Instagram doesn't support direct sharing via web. Copy the link and share manually.")
                        // Attempt to open Instagram app
                        window.open("instagram://app", "_blank")
                        // Fallback to website after a short delay
                        setTimeout(() => {
                          window.open("https://www.instagram.com/", "_blank")
                        }, 500)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        const text = encodeURIComponent("Checkout the amazing web compiler\nMade with ❤️")
                        const url = encodeURIComponent("https://ast-ide.vercel.app/")
                        window.open(`mailto:?subject=Check out this web compiler&body=${text}%0A${url}`, "_blank")
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => {
                        const text = encodeURIComponent("Checkout the amazing web compiler\nMade with ❤️")
                        const url = encodeURIComponent("https://ast-ide.vercel.app/")
                        window.open(`https://telegram.me/share/url?url=${url}&text=${text}`, "_blank")
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400"
                      >
                        <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l3.9 1.205 2.306 6.54c.5 1.4 2.364 1.866 3.427.837l1.937-1.873 5.308 3.895c.93.68 2.25.433 2.812-.538l6.75-11.6a2.25 2.25 0 0 0-2.6-3.256l-6.533 2.982-10.9-4.5z"></path>
                      </svg>
                      Telegram
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-center text-slate-400 text-xs">
                    Share this URL with your friends to have some fun in coding.
                  </p>
                  <p className="text-center text-slate-300 text-xs mt-2">Made with ❤️</p>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>

      {/* Code preview card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="w-full max-w-3xl mt-6 z-10"
      >
        <Card className="bg-gray-900/70 border-gray-800 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-1 px-4 py-2 bg-gray-800/70 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-400">index.html</div>
          </div>
          <pre className="p-4 text-sm sm:text-base font-mono text-gray-300 overflow-x-auto">
            <code>{`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AST Admin</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Welcome to AST Admin!!</h1>
    <h6>Happy Coding!!</h6>
    <div id="app"></div>
    <script src="app.js"></script>
  </body>
  </html>`}</code>
          </pre>
        </Card>
      </motion.div>

      {/* Tech stack scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="w-full mt-12 z-10"
      >
        <TechStackScroll />
      </motion.div>

      {/* Features section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-12 px-4 z-10"
      >
        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <div className="mb-4 text-primary">
            <Code2 size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multi-language Support</h3>
          <p className="text-gray-400">Compile and run HTML, CSS, JavaScript with ease.</p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <div className="mb-4 text-primary">
            <Terminal size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
          <p className="text-gray-400">See your changes instantly with live preview as you code.</p>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <div className="mb-4 text-primary">
            <Share2 size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
          <p className="text-gray-400">Share your code with a simple link or embed it anywhere.</p>
        </Card>
      </motion.div>

      {/* Footer section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="w-full max-w-5xl mt-12 text-center z-10 pt-8 border-t border-gray-800"
      >
        <p className="text-gray-400 text-sm">Made with Love</p>
        <p className="text-gray-300 font-medium mt-1">Team AST</p>
        <p className="text-gray-400 text-xs mt-3">Developed by Sriram Gandrothu</p>
        <p className="text-gray-500 text-xs mt-2">© {new Date().getFullYear()} All Rights Reserved</p>
      </motion.div>
    </div>
  )
}

