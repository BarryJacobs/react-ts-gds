export interface AgileProcess {
  title: string
  summary: string
  items: string[]
}

export const agileProcessData: AgileProcess[] = [
  {
    title: "Understanding agile project management",
    summary: "Introductions, methods, core features.",
    items: [
      "Agile and government services: an introduction",
      "Agile methods: an introduction",
      "Core principles of agile"
    ]
  },
  {
    title: "Working with agile methods",
    summary: "Workspaces, tools and techniques, user stories, planning.",
    items: [
      "Creating an agile working environment",
      "Agile tools and techniques",
      "Set up a team wall",
      "Writing user stories",
      "Planning in agile",
      "Deciding on priorities",
      "Developing a roadmap"
    ]
  },
  {
    title: "Governing agile services",
    summary: "Principles, measuring progress, spending money.",
    items: [
      "Governance principles for agile service delivery",
      "Measuring and reporting progress",
      "Spend controls: check if you need approval to spend money on a service",
      "Spend controls: apply for approval to spend money on a service",
      "Spend controls: the new pipeline process",
      "Working across organisational boundaries"
    ]
  },
  {
    title: "Phases of an agile project",
    summary: "Discovery, alpha, beta, live and retirement.",
    items: [
      "How the discovery phase works",
      "How the alpha phase works",
      "How the beta phase works",
      "How the live phase works",
      "Retiring your service"
    ]
  }
]
