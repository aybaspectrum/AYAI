import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function PitchPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <header className="mb-12 text-center">
        <h1 className="from-primary bg-gradient-to-r via-purple-400 to-pink-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Spectrum: Navigating the Agentic Age with Human-Centric AI
          Orchestration
        </h1>
      </header>

      <main className="space-y-16">
        {/* Executive Summary */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-3xl font-bold">
            Executive Summary
          </h2>
          <div className="text-muted-foreground space-y-4 text-justify">
            <p>
              We stand at the dawn of the &quot;Agentic Age,&quot; an era where
              autonomous AI agents promise to revolutionize every industry.
              However, this proliferation is creating an unprecedented
              &quot;Complexity Crisis.&quot; Managing fleets of opaque,
              interacting agents is becoming operationally untenable and
              strategically impossible for human leaders. This crisis is defined
              by contextual overload, process obfuscation, and strategic drift,
              threatening to undermine the very productivity gains AI promises.
            </p>
            <p>
              The current market is bifurcated, leaving a critical need unmet.
              On one end, low-level, code-intensive developer frameworks like
              LangChain and Autogen offer power but no strategic visibility. On
              the other, high-level business applications embed AI but offer no
              control or custom orchestration. There is a critical, unserved gap
              for a platform that empowers human strategists to define the what
              and the why, leaving the how to the machines.
            </p>
            <p>
              <strong className="text-foreground">
                SpectrumAI is a Strategic Visualization and Orchestration
                Platform
              </strong>{" "}
              designed to resolve this complexity crisis. It provides a
              human-centric interface to design, visualize, and steer complex
              agentic workflows, acting as the &quot;map and compass&quot; for
              the Agentic Age. It makes the strategic intent behind AI
              operations explicit, manageable, and adaptable.
            </p>
          </div>
        </section>

        {/* The Coming Storm */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-3xl font-bold">
            The Coming Storm: Navigating the Agentic Age&apos;s Complexity
            Crisis
          </h2>
          <div className="text-muted-foreground space-y-4 text-justify">
            <p>
              The rapid proliferation of artificial intelligence has created a
              severe and growing challenge: a crisis of complexity. As
              organizations deploy fleets of interacting agents, they face a
              multi-faceted crisis that existing tools are ill-equipped to
              handle.
            </p>
            <h3 className="text-foreground pt-4 text-2xl font-semibold">
              Contextual Overload & Process Obfuscation
            </h3>
            <p>
              The decentralized and partially observable nature of these systems
              creates critical &quot;observability gaps,&quot; making it nearly
              impossible for human operators to understand why a system made a
              particular decision or where a workflow failed.
            </p>
            <h3 className="text-foreground pt-4 text-2xl font-semibold">
              Coordination & Communication Overhead
            </h3>
            <p>
              As the number of agents in a system increases, the complexity of
              their communication pathways grows at an alarming rate, leading to
              significant overhead and the potential for system deadlocks and
              duplicated efforts.
            </p>
            <h3 className="text-foreground pt-4 text-2xl font-semibold">
              Strategic Drift
            </h3>
            <p>
              When the low-level operations of AI agent fleets become opaque,
              they can become decoupled from the high-level business objectives
              they were designed to serve, leading to wasted resources and
              mission failure.
            </p>
          </div>
        </section>

        {/* The Spectrum Solution */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-3xl font-bold">
            The Spectrum Solution: Human-Centric Clarity and Control
          </h2>
          <div className="text-muted-foreground space-y-4 text-justify">
            <p>
              SpectrumAI is an essential navigation system for the Agentic Age.
              It is engineered to abstract away the dizzying complexity of
              agentic execution, providing human leaders with a clear,
              intuitive, and powerful platform for strategic command and
              control.
            </p>
            <h3 className="text-foreground pt-4 text-2xl font-semibold">
              Core Pillars of the SpectrumAI Platform
            </h3>
            <div className="grid gap-6 pt-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Strategic Visualization Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  A dynamic, drag-and-drop canvas to map strategic initiatives
                  and make complex processes immediately legible.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Agentic Workflow Designer</CardTitle>
                </CardHeader>
                <CardContent>
                  A low-code interface to design and assign agentic workflows
                  using a library of pre-built, customizable agent templates.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dynamic Observability</CardTitle>
                </CardHeader>
                <CardContent>
                  Real-time monitoring of agent performance, progress, and
                  costs, with &quot;human-in-the-loop&quot; checkpoints for
                  essential governance.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Position */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-3xl font-bold">
            Strategic Market Position
          </h2>
          <div className="mt-6 rounded-lg border">
            <div className="bg-secondary grid grid-cols-4 border-b font-semibold">
              <div className="p-3">Market Segment</div>
              <div className="p-3 text-right">2024/25 Size (B)</div>
              <div className="p-3 text-right">2032 Size (B)</div>
              <div className="p-3 text-right">CAGR (%)</div>
            </div>
            <div className="grid grid-cols-4 border-b">
              <div className="p-3">Overall AI Market</div>
              <div className="p-3 text-right">$294.16</div>
              <div className="p-3 text-right">$1,771.62</div>
              <div className="p-3 text-right">29.2%</div>
            </div>
            <div className="grid grid-cols-4 border-b">
              <div className="p-3">MLOps Market</div>
              <div className="p-3 text-right">$3.4</div>
              <div className="p-3 text-right">$29.4</div>
              <div className="p-3 text-right">31.1%</div>
            </div>
            <div className="grid grid-cols-4 border-b">
              <div className="p-3">Low-Code Platform</div>
              <div className="p-3 text-right">$28.75</div>
              <div className="p-3 text-right">$264.40</div>
              <div className="p-3 text-right">32.2%</div>
            </div>
            <div className="grid grid-cols-4">
              <div className="p-3">AI Agent Platform</div>
              <div className="p-3 text-right">N/A</div>
              <div className="p-3 text-right">+$23.56 by 2029</div>
              <div className="p-3 text-right">41.1%</div>
            </div>
          </div>
        </section>

        {/* PESTLE Analysis */}
        <section>
          <h2 className="mb-4 border-b pb-2 text-3xl font-bold">
            PESTLE Analysis
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Badge>Political</Badge>
              </CardHeader>
              <CardContent>
                US policy favors deregulation and AI infrastructure investment,
                creating a favorable environment. Spectrum&apos;s governance
                features turn global regulatory fragmentation into an
                opportunity.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge>Economic</Badge>
              </CardHeader>
              <CardContent>
                Massive AI investment is a tailwind, but high project failure
                rates create skepticism. Spectrum is positioned as a de-risking
                platform that ensures ROI.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge>Social</Badge>
              </CardHeader>
              <CardContent>
                Widespread enterprise adoption creates market pull, but the
                &quot;Agent Ops&quot; talent shortage is a major bottleneck.
                Spectrum addresses this skills gap directly.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge>Technological</Badge>
              </CardHeader>
              <CardContent>
                The proliferation of complex agentic frameworks creates a clear
                need for a stable orchestration layer like Spectrum.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge>Legal</Badge>
              </CardHeader>
              <CardContent>
                Evolving laws around data privacy and AI liability make
                Spectrum&apos;s audit and traceability features a critical tool
                for compliance.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge>Environmental</Badge>
              </CardHeader>
              <CardContent>
                The unsustainable energy consumption of AI data centers is a
                critical global issue. Spectrum&apos;s ability to optimize
                workflows positions it as a &quot;Green AI&quot; enabler.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="pt-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            The Roadmap Ahead & Call to Action
          </h2>
          <p className="mt-8 text-xl font-bold">
            The future is not about replacing human ingenuity, but about
            amplifying it. Let&apos;s build that future together.
          </p>
        </section>
      </main>
    </div>
  );
}
