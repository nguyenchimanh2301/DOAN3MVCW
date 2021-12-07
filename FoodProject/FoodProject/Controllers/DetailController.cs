using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;
namespace FoodProject.Controllers
{
    public class DetailController : Controller
    {
        // GET: Detail
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult DetailPage(string MaSP)
        {
            ViewBag.MaSP = MaSP;
            return View();
        }
        [HttpGet]
       
        public JsonResult GetchitietSP(string masp)
        {
            var obj = db.SanPhams.Select(sp => new
            {
                sanpham_id = sp.sanpham_id,
                sanpham_name = sp.sanpham_name,
                gia = sp.gia,
                Loaisp_id = sp.Loaisp_id,
                picture = sp.picture,
                listSPhot = db.SanPhams.Select(b => new
                {
                    sanpham_id = b.sanpham_id,
                    sanpham_name = b.sanpham_name,
                    gia = b.gia,
                    Loaisp_id = b.Loaisp_id,
                    picture = b.picture,
                }).Where(x => x.Loaisp_id == sp.Loaisp_id).OrderByDescending(x => x.sanpham_id).Take(4).ToList(),
            }).SingleOrDefault(x => x.sanpham_id == masp);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }
    }
}
