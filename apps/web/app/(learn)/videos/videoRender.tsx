import { Button } from '@/components/ui/button';
import React from 'react';
import { motion} from "framer-motion";
import { useInView } from 'react-intersection-observer';
//@ts-ignore
const YouTubeVideoCard = ({ videoId, title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Optional: Trigger animation only once
    threshold: 0.5, // Optional: Trigger when 50% of the element is in view
  });

  return (
<>
    <motion.div ref={ref} 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.3,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }} className='mt-3 shadow-lg rounded-2xl p-4 dark:bg-slate-900 '>
        
      <iframe
        width="350"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        //@ts-ignore
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="video-info">
        <h2 className='text-xl m-2'>{title}</h2>
        <p>{description}</p>
        <Button onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`)} className='dark:bg-violet-500 dark:text-zinc-200'>Watch</Button>
      </div>
    </motion.div>
    
    </>
  );
};

export default YouTubeVideoCard;
