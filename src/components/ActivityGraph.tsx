
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ActivityData {
  date: string;
  commits: number;
  additions: number;
  deletions: number;
}

interface ActivityGraphProps {
  data: ActivityData[];
  title?: string;
}

export function ActivityGraph({
  data,
  title = "Repository Activity",
}: ActivityGraphProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 text-github-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64FFDA" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#64FFDA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAdditions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2EA043" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2EA043" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDeletions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E83151" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E83151" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                stroke="#8892B0"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                stroke="#8892B0"
              />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0A192F',
                  border: '1px solid #172A45',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="#64FFDA"
                fillOpacity={1}
                fill="url(#colorCommits)"
              />
              <Area
                type="monotone"
                dataKey="additions"
                stroke="#2EA043"
                fillOpacity={1}
                fill="url(#colorAdditions)"
              />
              <Area
                type="monotone"
                dataKey="deletions"
                stroke="#E83151"
                fillOpacity={1}
                fill="url(#colorDeletions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
