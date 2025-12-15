import Card from "../components/Card";
import Badge from "../components/Badge";
import { CLUSTERS } from "../data/clusters";
import { LOGS } from "../data/logs";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-slate-500">Indexed URLs</p>
          <p className="text-3xl font-bold mt-1">1,284</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">Authority Score</p>
          <p className="text-3xl font-bold mt-1">42</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">Crawl Budget Used</p>
          <p className="text-3xl font-bold mt-1">85%</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Topic Clusters
        </h3>

        <div className="space-y-3">
          {CLUSTERS.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between text-sm"
            >
              <div>
                <p className="font-medium text-slate-700">
                  {c.name}
                </p>
                <p className="text-xs text-slate-400">
                  {c.articles} articles
                </p>
              </div>

              <Badge text={c.status} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Recent Indexing Activity
        </h3>

        <div className="space-y-2 text-sm">
          {LOGS.map((l) => (
            <div
              key={l.id}
              className="flex justify-between border-b last:border-b-0 pb-2"
            >
              <span className="text-slate-600">
                {l.msg}
              </span>
              <span className="text-slate-400">
                {l.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
