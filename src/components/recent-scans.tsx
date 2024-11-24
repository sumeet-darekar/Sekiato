import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentScans = [
  {
    projectName: "Project Alpha",
    scanDate: "2023-06-15",
    vulnerabilities: 3,
    status: "Completed",
  },
  {
    projectName: "Project Beta",
    scanDate: "2023-06-14",
    vulnerabilities: 0,
    status: "Completed",
  },
  {
    projectName: "Project Gamma",
    scanDate: "2023-06-13",
    vulnerabilities: 7,
    status: "In Progress",
  },
  {
    projectName: "Project Delta",
    scanDate: "2023-06-12",
    vulnerabilities: 2,
    status: "Completed",
  },
  {
    projectName: "Project Epsilon",
    scanDate: "2023-06-11",
    vulnerabilities: 5,
    status: "Completed",
  },
]

export function RecentScans() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Project</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Vulnerabilities</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentScans.map((scan) => (
          <TableRow key={scan.projectName}>
            <TableCell className="font-medium">{scan.projectName}</TableCell>
            <TableCell>{scan.scanDate}</TableCell>
            <TableCell>{scan.vulnerabilities}</TableCell>
            <TableCell className="text-right">{scan.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

