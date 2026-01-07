import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import { Database, BrainCircuit, Boxes, TrendingUp } from "lucide-react";

const topics = [
  {
    title: "Data Engineering",
    description: "ETL, пайплайны, паттерны, real-time архитектура.",
    icon: Database,
  },
  {
    title: "AI in Production",
    description: "Внедрение и масштабирование ML и LLM-систем.",
    icon: BrainCircuit,
  },
  {
    title: "Architecture & Systems Design",
    description: "Микросервисы, отказоустойчивость, большие системы.",
    icon: Boxes,
  },
  {
    title: "Career & Growth",
    description: "Как развиваться инженеру и строить карьеру.",
    icon: TrendingUp,
  },
];

export default function HomepageTopics() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className="row">
          {topics.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className={clsx("col col--3", styles.card)}>
                
                <div className={styles.iconWrapper}>
                  <Icon size={40} strokeWidth={2} />
                </div>

                <h3 className={styles.title}>{t.title}</h3>

                <p className={styles.text}>{t.description}</p>
              
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
