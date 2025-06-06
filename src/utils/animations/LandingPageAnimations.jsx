import animations from "./LandingPageAnimations.module.css";
import styles from "../../pages/LandingPage/LandingPage.module.css";
import { useEffect } from "react";

/**
 * Animates the cards and the shapes of the 'LandingPage' component.
 *
 * All of the three animations used (scale X, fade-in and slide-up) are defined
 * in the 'LandingPageAnimation' CSS file.
 *
 * This hook animates the elements based in the 'IntersectionOberserver' API, animating
 * when the elements entered the user's viewport, when the 'LandingPage' component is finally
 * rendered (by using the 'useEffect' hook)
 *
 */
function useLandingPageAnimations() {
    useEffect(() => {
        const featureDescs = document.querySelectorAll(
            `.${styles.feature__desc}`
        );
        const featureLines = document.querySelectorAll(
            `.${styles.feature__line}`
        );
        const cards = document.querySelectorAll(
            `.${styles.card}:not(.${styles.feature} .${styles.card})`
        );

        featureDescs.forEach((desc) =>
            desc.classList.add(animations.baseFadeIn)
        );
        featureLines.forEach((line) =>
            line.classList.add(animations.baseScaleX)
        );
        cards.forEach((card) => card.classList.add(animations.baseSlideUp));

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (
                        entry.target.classList.contains(styles.feature__desc) &&
                        entry.isIntersecting
                    ) {
                        entry.target.classList.add(animations.fadeIn);

                        const line = entry.target.nextElementSibling;
                        line.classList.add(animations.scaleX);

                        observer.unobserve(entry.target);
                    } else if (
                        entry.target.classList.contains(styles.card) &&
                        entry.isIntersecting
                    ) {
                        entry.target.classList.add(animations.slideUp);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -20% 0px" }
        );

        featureDescs.forEach((desc) => observer.observe(desc));
        cards.forEach((card) => observer.observe(card));

        return () => {
            observer.disconnect();

            featureDescs.forEach((desc) =>
                desc.classList.remove(animations.baseFadeIn, animations.fadeIn)
            );
            featureLines.forEach((line) =>
                line.classList.remove(animations.baseScaleX, animations.scaleX)
            );
        };
    }, []);
}

export default useLandingPageAnimations;
