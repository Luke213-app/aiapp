'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from "lucide-react"

const aiTools = [
  {
    name: "ChatGPT",
    description: "An AI-powered chatbot for natural language conversations and task assistance.",
    url: "https://chat.openai.com/",
  },
  {
    name: "Grammarly",
    description: "AI-driven writing assistant for grammar, spelling, and style improvements.",
    url: "https://www.grammarly.com/",
  },
  {
    name: "InstaText",
    description: "AI tool for instant text improvement and professional editing.",
    url: "https://instatext.io/",
  },
  {
    name: "NotebookLM",
    description: "AI-powered note-taking and knowledge management tool.",
    url: "https://notebooklm.google.com/",
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write better code faster.",
    url: "https://github.com/features/copilot",
  },
]

type Tool = {
  name: string
  description: string
  url: string
}

export default function ToolsDashboard() {
  const [customTools, setCustomTools] = useState<Tool[]>([])
  const [newTool, setNewTool] = useState<Tool>({ name: '', description: '', url: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTool(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTool.name && newTool.description && newTool.url) {
      setCustomTools(prev => [...prev, newTool])
      setNewTool({ name: '', description: '', url: '' })
    }
  }

  const renderToolCards = (tools: Tool[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{tool.name}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Tools Dashboard</h1>
        <Tabs defaultValue="aitools" className="space-y-4">
          <TabsList>
            <TabsTrigger value="aitools">AI Tools</TabsTrigger>
            <TabsTrigger value="mytools">My Tools</TabsTrigger>
          </TabsList>
          <TabsContent value="aitools">
            <h2 className="text-2xl font-semibold mb-4">AI Tools for Employees</h2>
            {renderToolCards(aiTools)}
          </TabsContent>
          <TabsContent value="mytools">
            <h2 className="text-2xl font-semibold mb-4">My Custom Tools</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tool Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newTool.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Tool Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newTool.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Tool URL</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={newTool.url}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit">Add Tool</Button>
                </form>
              </CardContent>
            </Card>
            {customTools.length > 0 ? (
              renderToolCards(customTools)
            ) : (
              <p className="text-center text-muted-foreground">No custom tools added yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}