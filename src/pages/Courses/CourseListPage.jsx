import { Button, Spinner } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CourseCard from '../../components/course-components/CourseCard';
import { useCourses } from '../../contexts/CourseContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export default function CourseListPage() {

  const { user } = useContext (AuthContext);

  const { loading, allCourses } = useCourses();

  return (
    <>
      <div className='flex justify-center md:justify-between items-center flex-wrap'>
        <h1 className='text-3xl font-[900]'>Todos los cursos ({allCourses.length})</h1>
        {user.role.name_role === 'admin' ? <Link to={`/admin/adminDashboard/course`}>
          <Button colorScheme='twitter'>
            Crear Curso
          </Button>
        </Link> : ""}
        
      </div>

      {/* Courses List */}
      <div className='flex justify-center items-center gap-5 flex-wrap'>
        {
          loading ? <div className='flex justify-center my-10 items-center gap-3'>
            <Spinner />
            <small>Cargando </small>
          </div> :
            allCourses?.length === 0 && !loading ? <p>No existen cursos</p> :
              allCourses?.map((course, idx) => (
                <CourseCard
                  key={idx}
                  course={course}
                />
              ))
        }
      </div>  
    </>
  );
}
