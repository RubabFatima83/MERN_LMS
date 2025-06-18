import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import api from "../../auth/Services/api";
import CourseCard from "../../components/common/CourseCard";
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    level: [],
    language: [],
  });
  const [filters, setFilters] = useState({
    category: [],
    level: [],
    language: [],
  });
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await api.get("/course/filters_options");
        setFilterOptions({
          category: res.data.data.categories || [],
          level: res.data.data.levels || [],
          language: res.data.data.languages || [],
        });
      } catch (error) {
        console.error("Failed to fetch filter options", error);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    setFilters({
      category: [].concat(parsed.category || []),
      level: [].concat(parsed.level || []),
      language: [].concat(parsed.language || []),
    });
    setSort(parsed.sort || "");
  }, []);

  useEffect(() => {
    const query = qs.stringify({ ...filters, sort }, { arrayFormat: "repeat" });
    setSearchParams(query);

    const fetchCourses = async () => {
      try {
        const { data } = await api.get(`/course/get?${query}`);
        setCourses(data.data);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };

    fetchCourses();
  }, [filters, sort]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#01133d] text-gray-100 px-6 py-10">
        <motion.h1
          className="text-4xl font-bold mb-10 text-white text-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          Explore Our Courses
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.aside
            className="w-full lg:w-1/4 bg-[#0a1a4f] rounded-2xl border border-blue-900 shadow-xl p-6 space-y-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {['category', 'level', 'language'].map((type) => (
              <div key={type}>
                <h3 className="font-semibold text-white mb-3 text-lg border-b border-blue-800 pb-1">
                  {type.toUpperCase()}
                </h3>
                <div className="space-y-2">
                  {filterOptions[type].map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`${type}-${option}`}
                        className="accent-blue-500 h-4 w-4"
                        checked={filters[type].includes(option)}
                        onChange={() => handleFilterChange(type, option)}
                      />
                      <label
                        htmlFor={`${type}-${option}`}
                        className="text-sm text-gray-300 hover:text-white cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.aside>

          {/* Course Listing */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <span className="text-gray-300 text-sm">{courses.length} courses found</span>
              <select
                className="bg-white text-sm text-blue-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="level">Level</option>
              </select>
            </div>

            {/* Courses */}
            <motion.div
              className="flex flex-col space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard course={course} layout="horizontal" />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
