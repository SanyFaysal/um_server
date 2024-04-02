import { Course } from "../course/course.model";
import { Review } from "../review/review.model";



const getBestCourseFromDB = async () => {
  const pipeline = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        avarageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { avarageRating: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    { $unwind: '$course' },
    {
      $project: {
        _id: 0,
        course: '$course',
        averageRating: '$avarageRating',
        reviewCount: '$count',
      },
    },
  ]);
  const bestCourseId = pipeline[0].course._id;
  const bestCourse = await Course.findById(bestCourseId).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });

  return {
    course: bestCourse,
    averageRating: pipeline[0].averageRating,
    reviewCount: pipeline[0].reviewCount,
  };

};

export const BestCourseServices = {
  getBestCourseFromDB,
};
