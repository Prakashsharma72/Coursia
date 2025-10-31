import React, { useEffect, useState } from "react"; 

//const API_URL = "https://mocki.io/v1/715c487d-e74f-4b34-9c04-829e0487a487";
const API_URL ="https://mocki.io/v1/fa4b9f04-0d07-4fb2-984c-4cc6edd17e41";
 //const API_URL = "https://mocki.io/v1/f7cb0d96-2777-4326-9ebb-66b101925ac5";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Ensure data is an array
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-lg font-medium">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto text-center p-6">
        <p className="text-red-600 font-semibold mb-3">{error}</p>
        <p className="text-sm text-gray-600">
          If the API URL is incorrect or CORS blocks the request, try the
          alternate URL printed in the README or open the browser console.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
        Available Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id ?? course.courseName}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <div className="h-40 w-full mb-3 overflow-hidden rounded">
              <img
                src={course.image}
                alt={course.courseName || course.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold mb-1">
              {course.courseName || course.name}
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Instructor:</span>{" "}
              {course.instructor || "—"}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Duration:</span>{" "}
              {course.duration || "—"}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Mode:</span>{" "}
              {course.mode || "—"}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-blue-600 font-bold">
                {course.price || "Free"}
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
