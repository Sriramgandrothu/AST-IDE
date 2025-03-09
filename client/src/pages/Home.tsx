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
                <DialogTitle className="flex gap-1 justify-center items-center">
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
                <p className="text-center text-slate-400 text-xs">Share this URL's with your friends to have some fun in coding.</p>
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
          <p className="text-gray-400">Compile and run HTML, CSS, JavaScript, TypeScript, and more.</p>
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

