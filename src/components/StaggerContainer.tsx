"use client";

import { motion } from "framer-motion";

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Καθυστέρηση μεταξύ κάθε κάρτας
                delayChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] }
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {/* Πρέπει τα παιδιά να είναι motion.div με variants={item} για να δουλέψει, 
          αλλά για ευκολία εδώ απλά τυλίγουμε το grid */}
            {children}
        </motion.div>
    );
};

// Ένα απλό wrapper για κάθε item μέσα στο StaggerContainer
export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] }
        },
    };

    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    )
}