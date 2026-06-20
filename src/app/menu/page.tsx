"use client";

import {
  CategoryMixChart,
  ComboOpportunityChart,
  PriceLadderChart,
} from "@/components/menu/MenuDigitizerCharts";
import { QRMenuPreview } from "@/components/menu/QRMenuPreview";
import { AppLayout } from "@/components/layout/AppLayout";
import { Header } from "@/components/layout/Header";
import { AIRecommendationCard } from "@/components/ui/AIRecommendationCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  categoryMixData,
  comboOpportunityData,
  comboRecommendations,
  digitizationSteps,
  digitizedMenuCategories,
  menuInsights,
  priceLadderData,
  uploadedMenuPreview,
} from "@/data/menu";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  FileText,
  Image as ImageIcon,
  Layers,
  Loader2,
  Pencil,
  QrCode,
  ScanLine,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Upload,
  Wand2,
} from "lucide-react";
import { useCallback, useState } from "react";

type DigitizePhase = "idle" | "processing" | "complete";

export default function MenuPage() {
  const [phase, setPhase] = useState<DigitizePhase>("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "snacks-chaat": true,
  });
  const [publishedCategories, setPublishedCategories] = useState<Record<string, boolean>>({
    "snacks-chaat": true,
    "south-indian": true,
    "indian-main": true,
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePublish = (id: string) => {
    setPublishedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const runDigitization = useCallback(() => {
    setPhase("processing");
    setActiveStep(0);

    const stepDuration = 900;
    digitizationSteps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index + 1);
        if (index === digitizationSteps.length - 1) {
          setTimeout(() => setPhase("complete"), 600);
        }
      }, stepDuration * (index + 1));
    });
  }, []);

  return (
    <AppLayout>
      <Header
        title="AI Menu Digitizer"
        subtitle="Upload a menu image or PDF — ServePulse™ converts it into a structured digital menu, QR content, and beverage combo opportunities"
        badge="Menu Intelligence"
      />

      {/* ─── SECTION 1: AI MENU UPLOAD ─── */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="section-label mb-2">Step 1</p>
          <h2 className="text-xl font-bold text-white md:text-2xl">AI Menu Upload</h2>
          <p className="mt-1 text-sm text-silver">Upload your physical menu and let AI extract, classify, and digitize every item</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Upload panel */}
          <div className="space-y-4 lg:col-span-2">
            <GlassCard glow className="relative overflow-hidden">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                className={cn(
                  "flex flex-col items-center rounded-xl border-2 border-dashed p-8 text-center transition-all",
                  isDragging ? "border-electric bg-electric/10" : "border-white/10 bg-white/[0.02]"
                )}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-accent-violet shadow-lg">
                  <Upload className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Drag & Drop Menu</h3>
                <p className="mt-2 text-sm text-silver">or click to browse files</p>
                <p className="mt-3 text-xs text-silver/70">Accepted: JPG · PNG · PDF</p>
                <button className="mt-5 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                  Choose File
                </button>
              </div>
            </GlassCard>

            {/* Status flow */}
            <GlassCard>
              <h3 className="mb-4 text-sm font-semibold text-white">Digitization Pipeline</h3>
              <div className="space-y-3">
                {digitizationSteps.map((step, i) => {
                  const isDone = phase === "complete" || activeStep > step.id;
                  const isActive = phase === "processing" && activeStep === step.id;
                  return (
                    <motion.div
                      key={step.id}
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-3 transition-all",
                        isDone && "bg-emerald-500/10",
                        isActive && "bg-electric/10 ring-1 ring-electric/30",
                        !isDone && !isActive && "bg-white/[0.02]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                          isDone ? "bg-emerald-500/20 text-emerald-400" :
                          isActive ? "bg-electric/20 text-electric-light" :
                          "bg-white/5 text-silver"
                        )}
                      >
                        {isDone ? <Check className="h-4 w-4" /> : isActive ? <Loader2 className="h-4 w-4 animate-spin" /> : step.id}
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium", isDone || isActive ? "text-white" : "text-silver")}>{step.label}</p>
                        <p className="text-[10px] text-silver">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={runDigitization}
                disabled={phase === "processing"}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl brand-gradient py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {phase === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Digitize Menu with AI
                  </>
                )}
              </button>
            </GlassCard>
          </div>

          {/* Sample uploaded menu preview — Swiggy-style */}
          <GlassCard className="lg:col-span-3" delay={0.1}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="section-label mb-1">Uploaded Menu Preview</p>
                <h3 className="font-semibold text-white">{uploadedMenuPreview.restaurantName}</h3>
                <p className="text-xs text-silver">{uploadedMenuPreview.location}</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
                <FileText className="h-4 w-4 text-electric-light" />
                <span className="text-xs text-silver">{uploadedMenuPreview.fileName}</span>
              </div>
            </div>

            {/* Mock Swiggy-style menu card */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="border-b border-white/5 bg-gradient-to-r from-orange-500/10 to-red-500/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">VEG</span>
                  <span className="text-sm font-bold text-white">{uploadedMenuPreview.restaurantName}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-silver">{uploadedMenuPreview.cuisine} · {uploadedMenuPreview.pages} pages</p>
              </div>

              <div className="max-h-80 space-y-0 overflow-y-auto p-4">
                {[
                  { section: "Snacks & Chaat", items: ["Pani Puri · ₹89", "Pav Bhaji · ₹199", "Chole Bhature · ₹229"] },
                  { section: "South Indian", items: ["Masala Dosa · ₹169", "Idli Sambhar · ₹99", "Cheese Mysore Masala Dosa · ₹199"] },
                  { section: "Indian Main Course", items: ["Paneer Butter Masala · ₹329", "Dal Makhani · ₹289", "Kadhai Paneer · ₹329"] },
                  { section: "Rice", items: ["Jeera Rice · ₹159", "Ghee Rice · ₹159", "Peas Rice · ₹169"] },
                ].map((block) => (
                  <div key={block.section} className="mb-4 border-b border-white/5 pb-4 last:border-0">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-orange-400/80">{block.section}</p>
                    {block.items.map((item) => (
                      <div key={item} className="flex items-center justify-between py-1.5">
                        <span className="text-xs text-white/90">{item.split(" · ")[0]}</span>
                        <span className="text-xs font-semibold text-white">{item.split(" · ")[1]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-2">
                <span className="text-[10px] text-silver">{uploadedMenuPreview.fileSize} · {uploadedMenuPreview.uploadedAt}</span>
                <span className="flex items-center gap-1 text-[10px] text-electric-light">
                  <ScanLine className="h-3 w-3" /> Ready for AI extraction
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ─── SECTION 2 & 3: Revealed after digitization ─── */}
      <AnimatePresence>
        {(phase === "complete" || phase === "processing") && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: phase === "complete" ? 1 : 0.4, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 2: Digitized Menu Master */}
            <section className="mb-16">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="section-label mb-2">Step 2</p>
                  <h2 className="text-xl font-bold text-white md:text-2xl">Digitized Menu Master</h2>
                  <p className="mt-1 text-sm text-silver">
                    {menuInsights.totalMenuItems} items across {menuInsights.categoriesDetected} categories · Avg {formatCurrency(menuInsights.averageMenuPrice)}
                  </p>
                </div>
                {phase === "complete" && (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                    <Check className="h-3.5 w-3.5" /> Digitization Complete
                  </span>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {digitizedMenuCategories.map((cat, i) => (
                  <GlassCard key={cat.id} delay={0.05 * i} hover className="flex flex-col">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15 text-xl">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{cat.name}</h3>
                          <p className="text-xs text-silver">{cat.items.length} items · Avg {formatCurrency(cat.averagePrice)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => togglePublish(cat.id)}
                        className="flex items-center gap-1 text-[10px] font-medium text-silver"
                      >
                        {publishedCategories[cat.id] ? (
                          <ToggleRight className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="mb-3 rounded-lg bg-white/[0.03] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-silver">Top Item</p>
                      <p className="text-sm font-medium text-electric-light">{cat.topItem}</p>
                    </div>

                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="mb-2 flex w-full items-center justify-between text-xs font-medium text-silver hover:text-white"
                    >
                      {expandedCategories[cat.id] ? "Hide items" : "Show items"}
                      {expandedCategories[cat.id] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>

                    <AnimatePresence>
                      {expandedCategories[cat.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mb-4 max-h-48 space-y-1 overflow-y-auto"
                        >
                          {cat.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-2.5 py-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                <span className="truncate text-xs text-white">{item.name}</span>
                                {item.isPremium && (
                                  <span className="shrink-0 rounded bg-amber-500/20 px-1 text-[8px] font-medium text-amber-400">PRO</span>
                                )}
                              </div>
                              <span className="shrink-0 text-xs font-semibold text-electric-light">{formatCurrency(item.price)}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
                      <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-silver hover:bg-white/10 hover:text-white">
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                      <span className={cn("text-[10px] font-medium", publishedCategories[cat.id] ? "text-emerald-400" : "text-silver")}>
                        {publishedCategories[cat.id] ? "Published to QR" : "Draft"}
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* SECTION 3: Menu Intelligence */}
            {phase === "complete" && (
              <section className="mb-16">
                <div className="mb-6">
                  <p className="section-label mb-2">Step 3</p>
                  <h2 className="text-xl font-bold text-white md:text-2xl">Menu Intelligence & Combo Opportunities</h2>
                  <p className="mt-1 text-sm text-silver">AI-powered analytics to maximize menu performance and beverage attach</p>
                </div>

                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  <MetricCard title="Total Menu Items" value={menuInsights.totalMenuItems} icon={Layers} compact delay={0} />
                  <MetricCard title="Categories Detected" value={menuInsights.categoriesDetected} icon={ImageIcon} compact delay={0.05} accent="purple" />
                  <MetricCard title="Average Menu Price" value={menuInsights.averageMenuPrice} icon={Pencil} isCurrency compact delay={0.1} />
                  <MetricCard title="Premium Items" value={menuInsights.premiumItems} icon={Sparkles} compact delay={0.15} accent="green" />
                  <MetricCard title="Combo Opportunities" value={menuInsights.comboOpportunities} icon={Wand2} compact delay={0.2} accent="red" />
                  <GlassCard delay={0.25} className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-wide text-silver">Beverage Gap Score</p>
                    <p className="mt-1 text-2xl font-bold text-accent-red">{menuInsights.beverageGapScore}</p>
                    <p className="mt-1 text-[10px] text-silver">Strong upsell potential</p>
                  </GlassCard>
                </div>

                <div className="mb-6 grid gap-6 lg:grid-cols-3">
                  <ChartCard title="Category Mix" subtitle="Item distribution across menu">
                    <CategoryMixChart data={categoryMixData} />
                  </ChartCard>
                  <ChartCard title="Price Ladder by Category" subtitle="Min, average & max pricing">
                    <PriceLadderChart data={priceLadderData} />
                  </ChartCard>
                  <ChartCard title="Combo Opportunity by Category" subtitle="Bundle potential & attach rate">
                    <ComboOpportunityChart data={comboOpportunityData} />
                  </ChartCard>
                </div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-electric">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Recommendations</h3>
                    <p className="text-xs text-silver">Actionable combo and beverage pairing opportunities</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {comboRecommendations.map((rec, i) => (
                    <AIRecommendationCard
                      key={rec.id}
                      title={rec.title}
                      insight={rec.insight}
                      impact={rec.impact}
                      action={rec.action}
                      metric={rec.daypart}
                      delay={0.05 * i}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* QR Menu Preview */}
            {phase === "complete" && (
              <section>
                <div className="mb-6">
                  <p className="section-label mb-2">Output</p>
                  <h2 className="text-xl font-bold text-white md:text-2xl">Generated QR Menu Preview</h2>
                  <p className="mt-1 text-sm text-silver">Mobile-first QR menu ready for customer ordering</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <GlassCard glow className="flex flex-col items-center justify-center py-8">
                    <QRMenuPreview />
                  </GlassCard>

                  <GlassCard delay={0.1}>
                    <div className="mb-6 flex items-center gap-3">
                      <QrCode className="h-8 w-8 text-electric-light" />
                      <div>
                        <h3 className="font-semibold text-white">QR Menu Ready</h3>
                        <p className="text-sm text-silver">Published categories appear instantly on customer devices</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {digitizedMenuCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-4">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{cat.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-white">{cat.name}</p>
                              <p className="text-xs text-silver">{cat.items.length} items</p>
                            </div>
                          </div>
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                            publishedCategories[cat.id] ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-silver"
                          )}>
                            {publishedCategories[cat.id] ? "Live" : "Draft"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-6 w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-white shadow-lg">
                      Publish QR Menu
                    </button>
                  </GlassCard>
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "idle" && (
        <GlassCard className="py-12 text-center">
          <Wand2 className="mx-auto mb-4 h-10 w-10 text-electric-light/50" />
          <p className="text-silver">Upload a menu and click <span className="font-medium text-white">&quot;Digitize Menu with AI&quot;</span> to extract items, generate QR content, and unlock combo opportunities.</p>
        </GlassCard>
      )}
    </AppLayout>
  );
}
