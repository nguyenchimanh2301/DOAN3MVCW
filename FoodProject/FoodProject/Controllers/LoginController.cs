using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FoodProject.Models;
namespace FoodProject.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        DOAN3Entities1 db = new DOAN3Entities1();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult GetLogin(string id,string pass)
        {
            var lg = db.Usersses.FirstOrDefault();
            return Json(lg, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult DangNhap(string user,string pass)
        {
            try
            {
                var login = db.Usersses.SingleOrDefault(ac => ac.Users_id == user && ac.Passwords == pass);
                if (login != null)
                {
                    Session["user"] = user;
                }
                return Json(new { ok = 1}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { ok = 0}, JsonRequestBehavior.AllowGet);
            }
           

           
        }
    }
}
