import { useEffect, useRef, useState } from "react";
import "./timeline.scss";

type Item = {
    heading: string;
    content: string;
};

interface TimelineProps {
    items: Item[];
}

export const Timeline = ({ items }: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(
                    (entry) => entry.isIntersecting
                );
                if (visibleEntries.length === 0) return;

                const viewportCenter = window.innerHeight / 2;

                let closestEntry = visibleEntries[0];
                let minDistance = Math.abs(
                    visibleEntries[0].boundingClientRect.top +
                        visibleEntries[0].boundingClientRect.height / 2 -
                        viewportCenter
                );

                visibleEntries.forEach((entry) => {
                    const elemCenter =
                        entry.boundingClientRect.top +
                        entry.boundingClientRect.height / 2;
                    const distance = Math.abs(elemCenter - viewportCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestEntry = entry;
                    }
                });

                const index = itemRefs.current.findIndex(
                    (el) => el === closestEntry.target
                );
                if (index !== -1 && index !== activeIndex) {
                    setActiveIndex(index);
                }
            },
            {
                root: null,
                threshold: [0.5, 0.75, 1],
                rootMargin: "0px 0px 50% 0px",
            }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [activeIndex]);

    useEffect(() => {
        console.log("activeIndex", activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        if (itemRefs.current[0]) {
            itemRefs.current[0].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
        setActiveIndex(0);
    }, []);

    return (
        <ul className="timeline">
            {items.map(({ heading, content }, idx) => {
                const isEven = idx % 2 !== 0;
                const start = idx === 0;
                const end = idx === items.length - 1;
                const isActive = idx === activeIndex;

                return (
                    <li
                        key={idx}
                        ref={(el) => void (itemRefs.current[idx] = el)}
                        className={`
                            item 
                            ${isActive ? "active" : ""} 
                            ${isEven ? "even" : ""} 
                            ${start ? "start" : ""}
                            ${end ? "end" : ""}

                            `}
                    >
                        <strong>{heading}</strong>
                        <span>{content}</span>
                    </li>
                );
            })}
        </ul>
    );
};
