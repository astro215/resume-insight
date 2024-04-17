import styles, { layout } from "../style";
import Button from "./Button";

const Pricing = () => (
  <section id="product" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Affordable Pricing Plans
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Discover our flexible pricing options tailored for individuals and companies to access VedAI's powerful features and insights.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:mt-10 mt-6">
        <div className="flex flex-col">
          <h3 className={`${styles.paragraph} font-semibold text-dimWhite text-gradient`}>Individual Plan</h3>
          <p className={`${styles.paragraph} max-w-[470px]`}>
            Perfect for personal use and enthusiasts who want to explore Ayurveda on their own.
          </p>
          <p className={`${styles.paragraph} font-semibold text-dimWhite mt-2 `}>Price: $9.99/month</p>
        </div>

        <div className="flex flex-col ml-20">
          <h3 className={`${styles.paragraph} font-semibold text-dimWhite text-gradient `}>Company Plan</h3>
          <p className={`${styles.paragraph} max-w-[470px]`}>
            Tailored for businesses and organizations needing access for multiple users.
          </p>
          <p className={`${styles.paragraph} font-semibold text-dimWhite mt-2`}>Price: Custom Quote</p>
        </div>

        <div className="flex flex-col">
          <h3 className={`${styles.paragraph} font-semibold text-dimWhite text-gradient`}>API Key Access</h3>
          <p className={`${styles.paragraph} max-w-[470px]`}>
            Designed for developers and integrators requiring direct access to VedAI's APIs.
          </p>
          <p className={`${styles.paragraph} font-semibold text-dimWhite mt-2`}>Price: $299/month</p>
        </div>

        <div className="flex flex-col ml-20">
          <Button text="Purchase Now" styles={"mt-12"}/>
        </div>

      </div>
    </div>
  </section>
);

export default Pricing;
