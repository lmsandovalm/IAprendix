import { Button, Spinner } from '@chakra-ui/react';
import React, { useContext } from 'react';
import TopicCard from '../../components/topic-components/TopicCard';
import { useTopics } from '../../contexts/TopicContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export default function TopicListPage() {

  const { user } = useContext(AuthContext);

  const { loading, allTopics } = useTopics();

  return (
    <>
      <div className='flex justify-center md:justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-[900]'>Todas las temáticas ({allTopics.length})</h1>
        {user.role.name_role === 'admin' ? <Link to={`/admin/adminDashboard/topic`}>
          <Button colorScheme='twitter'>
            Crear Temática
          </Button>
        </Link> : ""}
        
      </div>

      {/* Topics List */}
      <div className='flex justify-center items-center gap-5 flex-wrap'>
        {
          loading ? <div className='flex justify-center my-10 items-center gap-3'>
            <Spinner />
            <small>Loading topics</small>
          </div> :
            allTopics?.length === 0 && !loading ? <p>No topics exist</p> :
              allTopics?.map((topic, idx) => (
                <TopicCard
                  key={idx}
                  topic={topic}
                />
              ))
        }
      </div>  
    </>
  );
}
