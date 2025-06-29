import React, { useState, useEffect } from 'react';
import './pricing.css';
import pb from '../../pocketbase'; // Adjust path as needed

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const records = await pb.collection('PricingPlan').getFullList();

        const plansWithImages = records.map((plan) => ({
          id: plan.id,
          name: plan.name,
          desc: plan.desc,
          supportType: plan.supportType,
          price: plan.price,
          image: pb.files.getURL(plan, plan.image),
        }));

        setPlans(plansWithImages);
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="pricing container section">
      <h2 className="section__title">Pricing Plans</h2>

      <div className="pricing__container grid">
        {plans.map((plan, index) => (
          <div
            className={`pricing__item ${index === 1 ? 'best' : ''}`}
            key={plan.id}
          >
            {index === 1 && <span className="badge">Recommended</span>}
            <img src={plan.image} alt={plan.name} className="pricing__img" />
            <h3 className="pricing__plan">{plan.name}</h3>
            <p className="pricing__title">{plan.desc}</p>
            <p className="pricing__support">{plan.supportType}</p>
            <h3 className="price">
              <em>$</em> {plan.price} <span>Month</span>
            </h3>
            <a href="#" className="btn">
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
