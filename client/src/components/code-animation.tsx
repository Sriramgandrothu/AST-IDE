"use client"

import { useEffect, useRef } from "react"

// Sample code snippets for animation
const codeSnippets = [
  `function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  `const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}`,
  `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    // More code...
  }
}`,
  `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
]

export default function CodeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Code snippets to display
    const codeBlocks: {
      x: number
      y: number
      speed: number
      text: string[]
      opacity: number
      size: number
    }[] = []

    // Initialize code blocks
    const initCodeBlocks = () => {
      for (let i = 0; i < 15; i++) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        const lines = snippet.split("\n")

        codeBlocks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.5,
          text: lines,
          opacity: 0.1 + Math.random() * 0.4,
          size: 10 + Math.floor(Math.random() * 6),
        })
      }
    }

    initCodeBlocks()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      codeBlocks.forEach((block) => {
        ctx.font = `${block.size}px monospace`
        ctx.fillStyle = `rgba(100, 255, 100, ${block.opacity})`

        block.text.forEach((line, index) => {
          ctx.fillText(line, block.x, block.y + index * (block.size + 2))
        })

        block.y += block.speed

        // Reset position when off screen
        const blockHeight = block.text.length * (block.size + 2)
        if (block.y > canvas.height) {
          block.y = -blockHeight
          block.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

