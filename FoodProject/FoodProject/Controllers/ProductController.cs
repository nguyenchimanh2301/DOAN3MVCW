using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;
namespace FoodProject.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProduct()
        {

            var list = db.SanPhams.Select(sp => new
            {
                Loaisp_id = sp.Loaisp_id,
                sanpham_id = sp.sanpham_id,
                sanpham_name = sp.sanpham_name,
                gia = sp.gia,
                Nhacungcap_id = sp.Nhacungcap_id,
                Soluong = sp.Soluong,
                picture = sp.picture
            }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Get()
        {
            var list = db.SanPhams.Select(sp => new
            {
                sanpham_id = sp.sanpham_id,
                sanpham_name = sp.sanpham_name,
                gia = sp.gia,
                picture = sp.picture
            }).Take(8);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetHot()
        {
            var list = db.SanPhams.Select(sp => new
            {
                sanpham_id = sp.sanpham_id,
                sanpham_name = sp.sanpham_name,
                gia = sp.gia,
                picture = sp.picture
            }).OrderBy(x => x.sanpham_id).Skip(8);
            return Json(list, JsonRequestBehavior.AllowGet);
        }






        public ActionResult kq()
        {
            string path = Server.MapPath("/") + "path.txt";
            var data = System.IO.File.ReadAllLines(path);
            string kq = " ";
            kq = string.Format("<table border :1px solid ><tr><th>TT</th><th>MSV</th><th>hoten</th><th>sdt</th></tr>");
            int dem = 1;
            string search = Request.Form["txt"].ToString().ToLower().Trim().Replace(" ", ".*");

            var reg = new Regex(search, RegexOptions.IgnoreCase);
            foreach (string t in data)
            {
                if (reg.IsMatch(t))
                    kq += string.Format("<tr><td>{0}</td><td>", dem++) + t.Replace("#", "</td><td>") + "</td></tr>";
            }
            kq += "</table";
            ViewBag.kq = kq;

            return View("Index");
        }

    }
}