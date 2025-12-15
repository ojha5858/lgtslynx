import Card from "../components/Card";
import Badge from "../components/Badge";
import { CLUSTERS } from "../data/clusters";
import { LOGS } from "../data/logs";
import { FaGlobe, FaChartLine, FaSpider } from "react-icons/fa";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* ===== METRICS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Indexed URLs */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Indexed URLs</p>
            <p className="text-3xl font-bold mt-1 text-slate-800">
              1,284
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/10
                          flex items-center justify-center">
            <FaGlobe className="text-accent" />
          </div>
        </Card>

        {/* Authority Score */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Authority Score</p>
            <p className="text-3xl font-bold mt-1 text-slate-800">
              42
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/10
                          flex items-center justify-center">
            <FaChartLine className="text-accent" />
          </div>
        </Card>

        {/* Crawl Budget */}
        <Card className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Crawl Budget Used</p>
            <p className="text-3xl font-bold mt-1 text-slate-800">
              85%
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/10
                          flex items-center justify-center">
            <FaSpider className="text-accent" />
          </div>
        </Card>
      </div>

      {/* ===== TOPIC CLUSTERS ===== */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Topic Clusters
        </h3>

        <div className="space-y-3">
          {CLUSTERS.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between text-sm
                         border-b last:border-b-0 pb-2"
            >
              <div>
                <p className="font-medium text-slate-700">
                  {c.name}
                </p>
                <p className="text-xs text-slate-400">
                  {c.articles} articles
                </p>
              </div>

              {/* Badge already styled – assumed accent-safe */}
              <Badge text={c.status} />
            </div>
          ))}
        </div>
      </Card>

      {/* ===== RECENT ACTIVITY ===== */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Recent Indexing Activity
        </h3>

        <div className="space-y-2 text-sm">
          {LOGS.map((l) => (
            <div
              key={l.id}
              className="flex justify-between items-center
                         border-b last:border-b-0 pb-2"
            >
              <span className="text-slate-600">
                {l.msg}
              </span>
              <span className="text-xs text-slate-400">
                {l.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
