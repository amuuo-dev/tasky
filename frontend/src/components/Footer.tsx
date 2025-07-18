import { CheckSquare } from "lucide-react";

const Footer = () => {
  return (
    <div className="py-24 px-9 bg-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-6">
        <div className="flex items-center cursor-pointer">
          <h2 className="md:text-3xl text-xl font-extrabold uppercase text-blue-700">
            Tasky
          </h2>
          <CheckSquare className="md:w-6 md:h-6 w-4 h-4 text-blue-700 translate-y-[-0.5em]" />
        </div>

        <div>
          <h2 className="heading">Features</h2>
          <p className="my-link">Plan</p>
          <p className="my-link">Build</p>
          <p className="my-link">Insights</p>
          <p className="my-link">Customer Requests</p>
          <p className="my-link">Linear Asks</p>
          <p className="my-link">Security</p>
          <p className="my-link">Mobile</p>
        </div>

        <div>
          <h2 className="heading">Product</h2>
          <p className="my-link">Pricing</p>
          <p className="my-link">Method</p>
          <p className="my-link">Integrations</p>
          <p className="my-link">Changelog</p>
          <p className="my-link">Documentation</p>
          <p className="my-link">Download</p>
          <p className="my-link">Switch</p>
        </div>

        <div>
          <h2 className="heading">Company</h2>
          <p className="my-link">About</p>
          <p className="my-link">Customers</p>
          <p className="my-link">Careers</p>
          <p className="my-link">Blog</p>
          <p className="my-link">README</p>
          <p className="my-link">Quality</p>
          <p className="my-link">Brand</p>
        </div>

        <div>
          <h2 className="heading">Resources</h2>
          <p className="my-link">Developers</p>
          <p className="my-link">Status</p>
          <p className="my-link">Startups</p>
          <p className="my-link">Report vulnerability</p>
          <p className="my-link">DPA</p>
          <p className="my-link">Privacy</p>
          <p className="my-link">Terms</p>
        </div>

        <div>
          <h2 className="heading">Connect with me</h2>
          <a href="https://www.linkedin.com/in/anthony-muuo/" target="_blank">
            <p className="my-link">Linkedin</p>
          </a>
          <a href="https://amuuo-dev.hashnode.dev/" target="_blank">
            <p className="my-link">Hashnode</p>
          </a>
          <a href="https://x.com/ducci_muuo" target="_blank">
            <p className="my-link">X (Twitter)</p>
          </a>
          <a href="https://github.com/amuuo-dev" target="_blank">
            <p className="my-link">GitHub</p>
          </a>
          <a href="https://www.youtube.com/@djafrofans" target="_blank">
            <p className="my-link">YouTube</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
