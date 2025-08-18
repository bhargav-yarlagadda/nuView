import Image from 'next/image';
import React from 'react';
import Typewriter from '../UI/TypeWriter';
import { Section } from 'lucide-react';
import ProjectForm from '../UI/ProjectForm';
import ProjectTiles from '../UI/ProjectTiles';


const HomePage = () => {
  return (
    <div className='flex flex-col max-w-5xl mx-auto w-full'>
      <section className="space-y-6 py-24 ">
        <div className="flex flex-col items-center">
          <Image
            src={"/new-view.svg"}
            alt='New View'
            width={64}
            height={64}
            className='hidden md:block'
          />
          <Typewriter />
        </div>
      </section>
      <section>
        <ProjectForm />
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Your Projects</h2>
        <ProjectTiles />
      </section>
    </div>
  );
};

export default HomePage;