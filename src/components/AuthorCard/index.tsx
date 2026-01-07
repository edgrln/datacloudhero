import React from "react";
import styles from "./AuthorCard.module.css";
import { Linkedin, Twitter, Github } from "lucide-react";

type AuthorCardProps = {
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
};

export default function AuthorCard(props: AuthorCardProps) {
  return (
    <div className={styles.card}>
      <img src={props.avatarUrl} className={styles.avatar} alt={props.name} />

      <h3 className={styles.name}>{props.name}</h3>

      <p className={styles.title}>{props.title}</p>

      <p className={styles.desc}>{props.description}</p>

      <div className={styles.social}>
        {props.github && (
          <a href={props.github} target="_blank" rel="noopener noreferrer">
            <Github size={20} />
          </a>
        )}
        {props.linkedin && (
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
        )}
        {props.twitter && (
          <a href={props.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter size={20} />
          </a>
        )}
      </div>
    </div>
  );
}
