import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Project {
  id: number
  name: string
  lastScan: string
  vulnerabilities: number
  status: string
}

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Project</TableHead>
          <TableHead>Last Scan</TableHead>
          <TableHead>Vulnerabilities</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.lastScan}</TableCell>
            <TableCell>{project.vulnerabilities}</TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline">View Report</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

